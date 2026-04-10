# awesome — CLAUDE.md

> 인터랙티브 UI 쇼케이스 | https://awesome.zerovoyage.com

## 개요

- **패키지명**: `awesome` v0.2.1
- **기술**: React 18.3, Vite, D3.js, TailwindCSS
- **기능**: 아날로그/디지털/텍스트 시계 등 인터랙티브 UI 모음
- **특징**: SSR/SSG 지원 (`entry-client.tsx` + `entry-server.tsx`)

## 개발 명령어

```bash
# 루트에서
pnpm dev:awesome

# 앱 디렉토리에서
pnpm dev            # 개발 서버 (포트 5173)
pnpm build          # 쉘 스크립트 빌드 + SSG
pnpm build:static   # 정적 빌드
pnpm preview:static # 정적 빌드 미리보기
pnpm lint
pnpm format
```

## 소스 구조

```
src/
├── pages/
│   └── clock/              # 시계 페이지 (analog, digital, text)
├── components/
│   ├── ui/
│   │   └── context-menu/
│   ├── common/
│   │   ├── header/
│   │   ├── footer/
│   │   ├── item-layout/
│   │   └── theme-layout/
│   └── layout/
├── contexts/
├── apis/
├── hooks/
├── routes/
├── lib/
├── entry-client.tsx        # 클라이언트 진입점 (SSG)
└── entry-server.tsx        # 서버 진입점 (SSG)
```

## 경로 별칭

| 별칭 | 실제 경로 |
|---|---|
| `@/*` | `./src/*` |

## 주요 의존성

- `d3` 7.9 — 시각화
- `react-query` — 서버 상태
- `@packages/vds` — 공유 UI 컴포넌트
- `@packages/api-client` — HTTP 클라이언트

## 특이사항

- SSG: `entry-client.tsx` / `entry-server.tsx` 로 서버사이드 렌더링 지원
- SSG 빌드용 별도 `tsconfig.static.json` 존재
- `vite.config.ts` 에 `VITE_APP_VERSION` 환경변수 주입
- 테마 전환 기능 있음 (`theme-layout`)
