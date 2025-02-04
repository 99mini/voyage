#!/bin/bash

# TODO: 
# AS-IS-webhooks의 health-check만 배포
# TO-BE-functions의 모든 엔드포인트 배포

set -e  # 에러 발생 시 즉시 종료

echo "Building the project..."
pnpm run build

# DigitalOcean Functions list 확인
echo "> doctl serverless functions list"
echo
doctl serverless functions list
echo

echo "Deploying to DigitalOcean Functions..."

# 프로젝트 디렉토리 생성
mkdir -p .doctl/fn/packages/webhooks/health-check
cp -r dist/* .doctl/fn/packages/webhooks/health-check/
cp package.json .doctl/fn/packages/webhooks/health-check/
cp .env .doctl/fn/packages/webhooks/health-check/

# project.yml 생성
cat > .doctl/fn/project.yml << EOL
packages:
    - name: webhooks
      functions:
        - name: health-check
          runtime: nodejs:18
          web: true
          environment:
            DO_API_KEY: \${DO_API_KEY}
          limits:
            memory: 256
          main: main.handler
EOL

# 배포 실행
doctl serverless deploy .doctl/fn

echo "Deployment complete!"