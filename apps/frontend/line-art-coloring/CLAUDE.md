# line-art-coloring — CLAUDE.md

> 인터랙티브 드로잉/색칠 앱 | https://line-art-coloring.zerovoyage.com

## 개요

- **패키지명**: `line-art-coloring` v0.1.0
- **기술**: React 18.3, Vite, D3.js, Canvas API
- **기능**: 선화 이미지를 업로드하고 색칠하는 인터랙티브 캔버스 앱

## 개발 명령어

```bash
# 루트에서
pnpm --filter line-art-coloring run dev

# 앱 디렉토리에서
pnpm dev            # 개발 서버 (포트 5173)
pnpm build          # 쉘 스크립트 빌드
pnpm build:deploy   # 빌드 + 배포
pnpm preview        # 빌드 미리보기
pnpm lint
pnpm format
```

## 소스 구조

```
src/
├── pages/
│   └── coloring/           # 색칠 메인 페이지
├── components/
│   ├── coloring/
│   │   └── coloring-canvas/ # 캔버스 컴포넌트 (핵심)
│   ├── common/
│   └── layout/
├── apis/
│   └── file/
│       ├── client/
│       ├── query/
│       └── model/
├── contexts/
└── root-router.tsx
```

## 경로 별칭

| 별칭 | 실제 경로 |
|---|---|
| `@/*` | `./src/*` |

## 주요 의존성

- `d3` 7.9 — 캔버스 조작 보조
- `react-query` — 파일 업로드 API 상태
- `@packages/vds` — 공유 UI 컴포넌트
- `@packages/api-client` — HTTP 클라이언트

## 특이사항

- Canvas API 직접 조작으로 색칠 기능 구현
- 파일 업로드는 REST API (`/files`) 연동
- `vite.config.ts` 에 `VITE_APP_VERSION` 환경변수 주입
