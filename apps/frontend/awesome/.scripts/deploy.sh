#!/bin/bash

set -e 

# DigitalOcean 서버 정보
PUBLIC_IP="206.189.36.207"
REMOTE_USER="root"
VOLUME_DIR="/mnt/volume_sgp1_01"
APP_NAME="react-awesome-app"

rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" dist/ ${REMOTE_USER}@${PUBLIC_IP}:${VOLUME_DIR}/${APP_NAME}/