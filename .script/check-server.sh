#!/bin/bash

DOMAIN_LIST=(
    "zerovoyage.com"
    "admin.zerovoyage.com"
    "awesome.zerovoyage.com"
    "tech.zerovoyage.com"
    "tool.zerovoyage.com"
    "api.zerovoyage.com"
)

for DOMAIN in "${DOMAIN_LIST[@]}"; do
    echo "Checking: $DOMAIN"

    # HTTPS 체크
    HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN")
    if [ "$HTTPS_STATUS" -ne 200 ]; then
        echo "❌ HTTPS check failed for https://$DOMAIN: Status $HTTPS_STATUS"
    else
        echo "✅ HTTPS check passed for https://$DOMAIN: Status $HTTPS_STATUS"
    fi

    echo "---------------------------------------"
done
