# admin — CLAUDE.md

> 서버 모니터링 및 파일 관리 대시보드 | https://admin.zerovoyage.com

## 개요

- **패키지명**: `admin` v0.1.0
- **기술**: React 18.3, Vite, TailwindCSS, Zustand, @tanstack/react-table
- **기능**: 서버 상태 모니터링, DigitalOcean Volume 파일 관리, 사용자 관리(TODO)

## 개발 명령어

```bash
# 루트에서
pnpm dev:admin

# 앱 디렉토리에서
pnpm dev          # 개발 서버 (포트 5173)
pnpm build        # 쉘 스크립트로 빌드
pnpm preview      # 빌드 결과 미리보기
pnpm lint
pnpm format
```

## 소스 구조

```
src/
├── pages/
│   ├── dashboard/          # 서버 상태 대시보드
│   └── files/              # 파일 관리 (DO Volume)
├── components/
│   ├── ui/
│   │   ├── table/          # 데이터 테이블
│   │   └── context-menu/   # 우클릭 컨텍스트 메뉴
│   ├── common/
│   ├── layout/
│   └── input/
├── contexts/
│   ├── auth-context.tsx    # 인증 컨텍스트
│   └── root-provider.tsx
├── hooks/
│   └── use-debounce.ts
└── apis/
```

## 경로 별칭

| 별칭 | 실제 경로 |
|---|---|
| `@/*` | `./src/*` |

## 주요 의존성

- `@tanstack/react-table` 8.21 — 테이블 UI
- `@radix-ui/react-context-menu` — 컨텍스트 메뉴
- `zustand` — 전역 상태
- `@packages/vds` — 공유 UI 컴포넌트
- `@packages/api-client` — HTTP 클라이언트
- `@ffmpeg/ffmpeg` — 미디어 처리

## 특이사항

- 인증이 필요한 보호된 라우트 포함 (`auth-context.tsx`)
- 파일 관리 기능은 In Progress 상태
- `vite.config.ts` 에 COEP/COOP 헤더 설정됨
