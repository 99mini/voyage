# about — CLAUDE.md

> 포트폴리오/랜딩 페이지 | https://about.zerovoyage.com

## 개요

- **패키지명**: `about` v1.0.0
- **기술**: React 18.2, Vite, TailwindCSS, Shadcn/UI, React Router 7, D3.js
- **특징**: SSG(Static Site Generation) 지원 (`entry-client.tsx` + `build-html.ts`)

## 개발 명령어

```bash
# 루트에서
pnpm dev:about

# 앱 디렉토리에서
pnpm dev          # 개발 서버 (포트 5173)
pnpm build        # Vite 빌드 + SSG
pnpm build:static # 정적 빌드
pnpm typecheck    # 타입 검사
pnpm lint
pnpm format
```

## 소스 구조

```
src/
├── pages/
│   └── home/               # 홈 페이지
├── components/
│   ├── hero/               # 히어로 섹션
│   ├── indicator/          # WakaTime 그래프
│   ├── common/             # 공통 컴포넌트
│   ├── layout/             # 레이아웃
│   └── utils/
├── apis/
│   └── me/
│       └── contribute.query.ts
├── contexts/
│   └── root-provider.tsx
├── root-router.tsx
└── entry-client.tsx        # SSG 진입점
```

## 경로 별칭

| 별칭 | 실제 경로 |
|---|---|
| `@/*` | `./src/*` |

## 주요 의존성

- `@packages/vds` — 공유 UI 컴포넌트
- `@packages/api-client` — HTTP 클라이언트
- `d3` — WakaTime 기여도 시각화
- `react-query` — 서버 상태 관리

## 특이사항

- `vite.config.ts` 에 COEP/COOP 헤더 설정됨 (SharedArrayBuffer 지원)
- SSG 빌드 시 `build-html.ts` 스크립트 실행
- WakaTime API를 통해 코딩 활동 시각화
