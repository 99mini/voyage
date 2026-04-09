# 프로젝트 구조

## 모노레포 개요

**Zero Voyage** — pnpm 워크스페이스 기반 SaaS 앱 모음 (author: [99mini](https://github.com/99mini))

```
voyage/
├── apps/
│   ├── frontend/
│   │   ├── about/             # 포트폴리오/랜딩 페이지
│   │   ├── tool/              # 미디어 처리 유틸리티
│   │   ├── tech/              # 기술 블로그 (Docusaurus)
│   │   ├── admin/             # 서버 모니터링 대시보드
│   │   ├── awesome/           # 인터랙티브 UI 쇼케이스
│   │   └── line-art-coloring/ # 드로잉 애플리케이션
│   ├── server/
│   │   ├── rest/              # NestJS REST API (메인 백엔드)
│   │   ├── functions/         # DigitalOcean 서버리스 함수
│   │   ├── batch/             # 배치 작업 (TODO)
│   │   └── shared/            # 서버 내부 공유 타입/유틸
│   └── cli/                   # CLI 도구 (TODO)
├── packages/
│   ├── vds/                   # Voyage Design System (컴포넌트 라이브러리)
│   ├── api-client/            # HTTP 클라이언트 래퍼
│   └── pb-api/                # PocketBase API 래퍼
├── .claude/                   # AI 어시스턴트 참조 문서
├── .github/workflows/         # GitHub Actions CI/CD
├── .docs/                     # 아이디어, PRD 템플릿
├── .script/                   # 유틸리티 셸 스크립트
└── static/                    # 정적 에셋
```

## 앱 목록

| 앱 | 패키지명 | 버전 | 프로덕션 URL |
|---|---|---|---|
| about | `about` | 1.0.0 | https://about.zerovoyage.com |
| tool | `tool` | 0.3.0 | https://tool.zerovoyage.com |
| tech | `tech` | 0.4.0 | https://tech.zerovoyage.com |
| admin | `admin` | 0.1.0 | https://admin.zerovoyage.com |
| awesome | `awesome` | 0.2.1 | https://awesome.zerovoyage.com |
| line-art-coloring | `line-art-coloring` | 0.1.0 | https://line-art-coloring.zerovoyage.com |
| REST API | `server-rest` | 1.4.2 | https://api.zerovoyage.com |
| Functions | `server-functions` | 1.1.0 | — (serverless) |

## 패키지 목록

| 패키지 | 패키지명 | 버전 | 설명 |
|---|---|---|---|
| vds | `@packages/vds` | 0.1.2 | 공유 컴포넌트 라이브러리 + Storybook |
| api-client | `@packages/api-client` | 0.1.0 | HTTP 클라이언트 (ESM/CJS) |
| pb-api | `@packages/pb-api` | 0.1.0 | PocketBase 클라이언트 래퍼 |

## 프론트엔드 앱 공통 구조

모든 Vite 기반 React 앱은 동일한 구조를 따릅니다:

```
src/
├── pages/
│   └── [page-name]/
│       ├── components/     # 페이지 전용 컴포넌트
│       ├── hooks/          # 페이지 전용 훅
│       └── utils/          # 페이지 전용 유틸
├── components/             # 공통 컴포넌트
│   ├── common/             # 헤더, 푸터, 레이아웃
│   ├── input/              # 입력 컴포넌트
│   └── layout/             # 레이아웃 래퍼
├── apis/                   # API 호출 함수
│   ├── _client/            # axios/fetch 클라이언트 설정
│   └── _modal/             # 응답 타입 정의
├── hooks/                  # 공통 훅
├── contexts/               # React Context
└── lib/                    # 유틸리티
```

## 백엔드 NestJS 구조

```
src/
├── modules/                # 기능별 도메인 모듈
│   └── [domain]/
│       └── [subdomain]/
│           ├── dto/
│           ├── entities/
│           ├── [name].controller.ts
│           ├── [name].service.ts
│           └── [name].module.ts
├── auth/                   # 인증 가드/전략
├── common/                 # 공통 서비스, 인터셉터, 데코레이터
├── prisma/                 # Prisma 서비스
├── supabase/               # Supabase 서비스
├── ws/                     # WebSocket 게이트웨이
├── webhooks/               # 웹훅 핸들러
└── main.ts
```
