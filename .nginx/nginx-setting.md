1. create /etc/nginx/sites-available/<sub-domain>.zerovoyage.com

```bash
vi /etc/nginx/sites-available/<sub-domain>.zerovoyage.com
```

2. link /etc/nginx/sites-enabled/<sub-domain>.zerovoyage.com

```bash
sudo ln -s /etc/nginx/sites-available/<sub-domain>.zerovoyage.com /etc/nginx/sites-enabled/
```

3. restart nginx

```bash
nginx -t
sudo systemctl restart nginx
```
