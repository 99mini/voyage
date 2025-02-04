#!/bin/bash

# TODO: 
# AS-IS-webhooks의 health-check만 배포
# TO-BE-functions의 모든 엔드포인트 배포

set -e  # 에러 발생 시 즉시 종료

echo "Building the project..."
pnpm run build

ls ./dist

# DigitalOcean Functions list 확인
echo "> doctl serverless functions list"
echo
doctl serverless functions list
echo

echo "Deploying to DigitalOcean Functions..."

# dist 디렉토리로 이동 후 배포
cd dist
doctl serverless deploy .

echo "Deployment complete!"