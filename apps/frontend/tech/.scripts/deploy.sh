#!/bin/bash

set -e  # 에러 발생 시 즉시 종료

# DigitalOcean 서버 정보
PUBLIC_IP="206.189.36.207"
REMOTE_USER="root"
VOLUME_DIR="/mnt/volume_sgp1_01"
APP_NAME="docusaurus-tech-app"

rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" ./build $REMOTE_USER@$PUBLIC_IP:$VOLUME_DIR/$APP_NAME/