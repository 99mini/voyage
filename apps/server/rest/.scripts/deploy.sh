#!/bin/bash

set -e  # 에러 발생 시 즉시 종료

# DigitalOcean 서버 정보
PUBLIC_IP="206.189.36.207"
REMOTE_USER="root"
REMOTE_DIR="/var/www/server-rest"
APP_NAME="server-rest"                # PM2에서 관리할 프로세스 이름

# 1. build
echo "🚀 Running build..."

pnpm run build

echo "✅ Build completed"

# 2. deploy copy dist/main.cjs
echo "🚀 Deploying to $PUBLIC_IP server..."

rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" ./dist root@$PUBLIC_IP:$REMOTE_DIR
rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" ./ecosystem.config.js root@$PUBLIC_IP:$REMOTE_DIR

echo "✅ Deploy completed"

# 3. restart pm2
echo "🚀 Restarting PM2 process..."

ssh $REMOTE_USER@$PUBLIC_IP << EOF
  cd $REMOTE_DIR
  mkdir -p logs

  if pm2 list | grep -q "$APP_NAME"; then
    pm2 restart ecosystem.config.js --env production
  else
    pm2 start ecosystem.config.js --env production
  fi

  pm2 save  # 서버 재부팅 후에도 실행 유지
EOF

echo "✅ Restarts completed!"
