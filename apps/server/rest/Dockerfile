# 1. Node.js 공식 이미지 사용 (빌드용)
FROM node:18-slim AS builder

# 2. 작업 디렉터리 설정
WORKDIR /app

# 3. pnpm 설치
RUN npm install -g pnpm@9.0.0

# 4. 모노레포 설정 파일 복사
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# 5. TypeScript 설정 파일 복사
COPY tsconfig.base.json ./
COPY apps/server/rest/tsconfig.json ./apps/server/rest/

# 6. 필요한 패키지의 package.json 복사
COPY apps/server/rest/package.json ./apps/server/rest/
COPY apps/server/shared/package.json ./apps/server/shared/

# 7. 의존성 설치 (빌드에 필요한 devDependencies 포함)
RUN pnpm install --frozen-lockfile

# 8. 소스 코드 복사
COPY apps/server/rest/.scripts ./apps/server/rest/.scripts
COPY apps/server/rest/src ./apps/server/rest/src
COPY apps/server/shared/src ./apps/server/shared/src

# 9. 빌드
RUN pnpm --filter server-rest run build

# 10. 실행 환경 설정 (더 작은 이미지 사용)
FROM node:18-slim AS deps

WORKDIR /app

# 11. 프로덕션 의존성만 설치
COPY apps/server/rest/package.json ./package.json
RUN npm install --omit=dev --no-package-lock

# 12. 최종 실행 환경 (가장 작은 이미지 사용)
FROM gcr.io/distroless/nodejs18-debian11 AS runner

WORKDIR /app

# 13. 프로덕션에 필요한 파일만 복사
COPY --from=builder /app/apps/server/rest/dist/main.js ./
COPY --from=deps /app/node_modules ./node_modules

# 14. 환경 변수 설정
ENV NODE_ENV=production \
    PORT=3000

# 15. 포트 설정
EXPOSE 3000

# 16. 실행
CMD ["main.js"]