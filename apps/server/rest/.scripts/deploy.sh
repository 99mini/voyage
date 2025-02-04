#!/bin/bash

set -e  # 에러 발생 시 즉시 종료

# 현재 스크립트의 절대 경로를 구함
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../../" && pwd)"

# 프로젝트 루트 디렉토리로 이동
cd "$PROJECT_ROOT"

# 환경 변수 로드
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# DigitalOcean 서버 정보
REMOTE_USER="root"
REMOTE_DIR="/var/www/server-rest"

# 1. Docker 이미지 빌드 (server-rest만 포함)
echo "🐳 Building Docker image..."
docker buildx build --platform linux/amd64 -t server-rest -f apps/server/rest/Dockerfile .

# 2. Docker 이미지 푸시 (Docker Hub 사용)
docker tag server-rest $DOCKER_USERNAME/voyage:latest
docker push $DOCKER_USERNAME/voyage:latest

# 3. DigitalOcean 서버에서 컨테이너 실행
echo "🚀 Deploying container on DigitalOcean..."
ssh $REMOTE_USER@$PUBLIC_IP << EOF
  docker pull $DOCKER_USERNAME/voyage:latest
  docker stop server-rest || true
  docker rm server-rest || true
  docker run -d --name server-rest -p 3000:3000 $DOCKER_USERNAME/voyage:latest
EOF

echo "✅ Deployment complete!"