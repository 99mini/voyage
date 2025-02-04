#!/bin/bash

# 빌드 디렉토리 초기화
rm -rf dist
mkdir -p dist

# TypeScript 컴파일
echo "🔨 Building with esbuild..."
pnpm exec esbuild \
  src/main.ts \
  --bundle \
  --platform=node \
  --target=node18 \
  --outfile=dist/main.js \
  --format=cjs \
  --external:express \
  --external:@nestjs/core \
  --external:@nestjs/common \
  --external:@nestjs/platform-express \
  --minify