#!/bin/bash

# Usage: ./deploy.sh [--clean]
# --clean: remote dist directory clean
# sh ./deploy.sh --clean

set -e  # 에러 발생 시 즉시 종료

CLEAN_FLAG=$1

# 배포 시간 측정
START_TIME=$(date +%s)

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

if [ "$CLEAN_FLAG" = "--clean" ]; then
  echo "🚀 Clean remote dist directory"
  ssh $REMOTE_USER@$PUBLIC_IP "rm -rf $REMOTE_DIR/dist"
  echo "✅ Clean remote dist directory completed"
fi

rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" ./dist root@$PUBLIC_IP:$REMOTE_DIR

echo "🚀 copy package.json, env.production..."

rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" ./package.json root@$PUBLIC_IP:$REMOTE_DIR
rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" ./.env.production root@$PUBLIC_IP:$REMOTE_DIR

echo "🚀 copy prisma/schema.prisma"
rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" ./prisma root@$PUBLIC_IP:$REMOTE_DIR

echo "✅ Deploy completed"

# 3. restart pm2
echo "🚀 Restarting PM2 process..."

ssh $REMOTE_USER@$PUBLIC_IP << EOF
  cd $REMOTE_DIR
  mkdir -p logs

  NODE_OPTIONS="--max-old-space-size=1024" pnpm install --prod

  echo "🚀 move src/generated to dist"
  mv src/generated dist
  rm -rf src

  if pm2 list | grep -q "$APP_NAME"; then
    echo "✅ $APP_NAME is running"
    pm2 restart server-rest
  else
    echo "✅ $APP_NAME is not running"
    pm2 start dist/main.js --name server-rest
  fi

  pm2 save  # 서버 재부팅 후에도 실행 유지
EOF

echo "✅ Restarts completed!"
TIME_TAKEN=$(($(date +%s) - $START_TIME))
echo "🚀 Deploy completed! $TIME_TAKEN seconds"
