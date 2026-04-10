# server/functions — CLAUDE.md

> DigitalOcean 서버리스 함수

## 개요

- **패키지명**: `server-functions` v1.1.0
- **기술**: TypeScript, Node.js 18, DigitalOcean Functions
- **기능**: 웹훅 처리 (GitHub, 헬스 체크)

## 개발 명령어

```bash
# 앱 디렉토리에서
pnpm build        # 쉘 스크립트 빌드 (esbuild)
pnpm deploy       # DigitalOcean Functions 배포
pnpm lint
pnpm format
```

> **참고**: `package.json` 에 `dev` 스크립트가 없습니다. 로컬 개발은 `doctl serverless` CLI를 직접 사용하세요.

## 소스 구조

```
src/
├── packages/
│   └── webhooks/           # DO Functions 패키지 구조
│       ├── health/         # 헬스 체크 함수
│       └── github/         # GitHub 웹훅 함수
├── webhooks/               # 구현 코드
│   ├── health.ts
│   └── github.ts
└── index.ts                # 진입점
project.yml                 # DO Functions 설정 파일
```

## project.yml 구조

```yaml
packages:
  - name: webhooks
    functions:
      - name: health
        runtime: nodejs:18
      - name: github
        runtime: nodejs:18
```

## 주요 의존성

- `@apps/server/shared` — 서버 내부 공유 타입
- `esbuild` — 함수 번들링
- `@babel/*` — 트랜스파일

## 특이사항

- DigitalOcean Functions는 각 함수가 독립적인 HTTP 엔드포인트
- 배포 전 반드시 `project.yml` 에 함수 등록 필요
- 로컬 개발: `doctl serverless` CLI 사용 (`dev` 스크립트 없음)
- 빌드 결과는 각 함수별 번들 파일 생성
