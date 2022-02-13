docker run -it --rm --name certbot \
            -v "$(pwd)/certs:/etc/letsencrypt" \
            certbot/certbot certonly --register-unsafely-without-email --manual -d motint.xyz -d www.motint.xyz --preferred-challenge dns
