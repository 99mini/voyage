# packages/api-client — CLAUDE.md

> HTTP API 클라이언트 래퍼

## 개요

- **패키지명**: `@packages/api-client` v0.1.0
- **기술**: TypeScript, Fetch API, Rollup
- **출력**: ESM (`dist/index.mjs`) + CJS (`dist/index.cjs`) + 타입 (`dist/index.d.ts`)
- **내보내기**: `{ apiClient }`

## 개발 명령어

```bash
# 루트에서
pnpm dev:api-client

# 패키지 디렉토리에서
pnpm build          # Rollup 빌드
pnpm dev            # Rollup watch (기본 환경)
pnpm dev:prod       # Rollup watch (프로덕션 환경)
pnpm dev:local      # Rollup watch (로컬 환경)
```

## 소스 구조

```
src/
├── client/         # API 클라이언트 구현
├── types/
│   └── responses.ts # 공통 응답 타입
├── _config/
│   └── env.ts      # 환경변수 설정 (BASE_URL, NODE_ENV)
└── index.ts        # 공개 API
```

## 환경변수

Rollup 빌드 시 `.env` 파일에서 주입:

```bash
BASE_URL=https://api.zerovoyage.com/v1   # 기본값, 또는 http://localhost:3000
NODE_ENV=development|production
```

## 앱에서 사용하는 법

```typescript
import { apiClient } from '@packages/api-client';

const data = await apiClient.get('/health');
```

## 특이사항

- 외부 npm 의존성 없음 — 순수 Fetch API 래퍼
- 환경별 `BASE_URL` 은 빌드 시점에 번들에 인라인됨
- `ENV_NAME` 환경변수로 빌드 환경 지정 가능
