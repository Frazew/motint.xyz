# MotINT

Une adaptation du ***REMOVED*** / Motus, pour l'INT, basée sur [react-***REMOVED***](https://github.com/cwackerfuss/react-***REMOVED***).

## Configuration

L'utilisation via Terraform nécessite de déclarer quelques variables d'environnement simples, dans `terraform/env.sh` par exemple:

```
export SCW_ACCESS_KEY="[your API access key]"
export SCW_SECRET_KEY="[your API secret key]"
export TF_VAR_scw_secret_token="$SCW_SECRET_KEY"
export AWS_ACCESS_KEY="$SCW_ACCESS_KEY"
export AWS_SECRET_KEY="$SCW_SECRET_KEY"
```

## Déploiement

Le déploiement se fait via Terraform avec des ressources Scaleway. Après avoir créé `env.sh` et les certificats TLS via `cert.sh`:

```bash
cd terraform/
source env.sh
terraform apply
```