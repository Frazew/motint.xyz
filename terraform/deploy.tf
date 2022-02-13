terraform {
  required_providers {
    scaleway = {
      source = "scaleway/scaleway"
    }
  }
  required_version = ">= 0.13"
}

variable "project_id" {
  type = string
  default = "257dff30-6c8c-4912-ab81-0c77dcc3f3cc"
  description = "The main project ID"
}

variable "dns_zone" {
  type = string
  default = "motint.xyz"
  description = "The main DNS zone"
}

variable "scw_secret_token" {
  type = string
  description = "The secret token to use for API interaction"
}

provider "scaleway" {
  zone   = "fr-par-2"
  region = "fr-par"
  project_id = var.project_id
}

resource "random_id" "static_name" {
  byte_length = 8
}

resource "scaleway_object_bucket" "static" {
  name = "static${lower(random_id.static_name.hex)}"
  acl  = "public-read"

  cors_rule {
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["motint.xyz", "www.motint.xyz"]
  }
}

resource "null_resource" "static" {
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command = "docker build . -t builder && docker run --rm --name builder -v \"$(pwd)/dist:/app/build\" builder && rclone sync --s3-provider Scaleway --s3-region fr-par --s3-env-auth --s3-endpoint s3.fr-par.scw.cloud --s3-acl public-read --s3-storage-class STANDARD ${path.module}/dist :s3:${scaleway_object_bucket.static.name}"
    interpreter = ["bash", "-c"]
  }
}

resource "scaleway_instance_ip" "gateway_ip" {
}

resource "scaleway_instance_server" "gateway" {
  type  = "DEV1-S"
  image = "ubuntu_focal"
  enable_ipv6 = true
  ip_id = scaleway_instance_ip.gateway_ip.id

  user_data = {
    cloud-init = templatefile("${path.module}/motint-cloud-init.tftpl", {
      motint_tls_key = base64encode(file("certs/archive/motint.xyz/privkey1.pem"))
      motint_tls_cert = base64encode(file("certs/archive/motint.xyz/fullchain1.pem"))
      traefik_config = base64encode(file("traefik.toml"))
      traefik_motint_config = base64encode(templatefile("traefik_motint.tftpl", { bucket_endpoint = scaleway_object_bucket.static.endpoint }))
    })
  }

  root_volume {
    delete_on_termination = true
  }
}

resource "scaleway_domain_record" "gateway_A" {
  dns_zone = var.dns_zone
  keep_empty_zone = true
  name     = ""
  type     = "A"
  data     = scaleway_instance_server.gateway.public_ip
  ttl      = 3600
}

resource "scaleway_domain_record" "gateway_AAAA" {
  dns_zone = var.dns_zone
  keep_empty_zone = true
  name     = ""
  type     = "AAAA"
  data     = scaleway_instance_server.gateway.ipv6_address
  ttl      = 3600
}

resource "scaleway_domain_record" "www_CNAME" {
  dns_zone = var.dns_zone
  name     = "www"
  type     = "CNAME"
  data     = "motint.xyz."
  ttl      = 3600
}