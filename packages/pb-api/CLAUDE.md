# packages/pb-api — CLAUDE.md

> PocketBase API 클라이언트 래퍼

## 개요

- **패키지명**: `@packages/pb-api` v0.1.0
- **기술**: TypeScript, PocketBase 0.25.1, Rollup
- **출력**: ESM (`dist/index.mjs`) + CJS (`dist/index.cjs`) + 타입 (`dist/index.d.ts`)

## 개발 명령어

```bash
# 루트에서
pnpm dev:pb-api

# 패키지 디렉토리에서
pnpm build    # Rollup 빌드
pnpm dev      # Rollup watch
```

## 소스 구조

```
src/
├── client/
│   └── pb-client.ts    # PocketBase 클라이언트 초기화
├── types/              # 타입 정의
├── _config/
│   └── env.ts          # 환경변수 (PB_URL_APP, PB_URL_API)
└── index.ts            # 공개 API
```

## 환경변수

Rollup 빌드 시 `.env` 파일에서 주입:

```bash
PB_URL_APP=<PocketBase 앱 URL>
PB_URL_API=<PocketBase API URL>
```

## 앱에서 사용하는 법

```typescript
import { pbClient } from '@packages/pb-api';

const records = await pbClient.collection('items').getList();
```

## 특이사항

- 프론트엔드에서 PocketBase API 직접 호출할 때 사용
- REST API 서버를 거치지 않고 PocketBase에 직접 연결
- 환경변수는 빌드 시점에 번들에 인라인됨
