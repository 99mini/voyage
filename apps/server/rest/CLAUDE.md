# server/rest — CLAUDE.md

> NestJS REST API 서버 | https://api.zerovoyage.com

## 개요

- **패키지명**: `server-rest` v1.4.2
- **기술**: NestJS 11, Express, Prisma, Supabase, Socket.io
- **포트**: 3000
- **Swagger 문서**: https://api.zerovoyage.com/docs (개발: http://localhost:3000/docs)

## 개발 명령어

```bash
# 루트에서
pnpm dev:rest

# 앱 디렉토리에서
pnpm dev              # tsx watch (NODE_ENV=development)
pnpm build            # nest build
pnpm start            # pm2 프로덕션 실행
pnpm start:dev        # build + nest start --watch
pnpm test             # Jest
pnpm test:watch       # Jest watch 모드
pnpm test:coverage    # 커버리지 리포트
pnpm prisma:generate  # Prisma 클라이언트 생성
pnpm prisma:migrate   # DB 마이그레이션
pnpm prisma:studio    # Prisma Studio (GUI)
pnpm prisma:seed      # DB 시드
```

## 소스 구조

```
src/
├── modules/                    # 도메인별 기능 모듈
│   ├── auth/                   # 인증
│   ├── find-video/             # 비디오 검색
│   ├── me/                     # 사용자 정보
│   ├── files/                  # 파일 관리 (DO Volume)
│   │   ├── dto/
│   │   ├── utils/
│   │   ├── entities/
│   │   └── constants/
│   ├── health/                 # 헬스 체크
│   └── internal/               # 내부 API
├── auth/
│   └── guards/                 # 인증 가드
├── common/                     # 공통 서비스, 인터셉터, 데코레이터
│   └── common.module.ts
├── webhooks/                   # 웹훅 핸들러
│   ├── github/
│   └── health/
├── prisma/                     # Prisma 서비스
├── supabase/                   # Supabase 서비스
├── ws/                         # WebSocket 게이트웨이 (Socket.io)
├── types/                      # 공유 타입
└── main.ts                     # 앱 부트스트랩 (포트 3000)
```

## 경로 별칭

| 별칭 | 실제 경로 |
|---|---|
| `@server-rest/*` | `./src/*` |

## 모듈 추가 규칙

새 도메인 모듈 추가 시 DDD 패턴 준수:

```
src/modules/[도메인]/[서브도메인]/
├── dto/
│   ├── create-[name].dto.ts
│   └── update-[name].dto.ts
├── entities/
│   └── [name].entity.ts
├── [name].controller.ts   # 라우팅 + 유효성 검사만
├── [name].service.ts      # 비즈니스 로직
└── [name].module.ts       # 모듈 등록
```

## 주요 의존성

- `@nestjs/*` 11.0 — NestJS 코어
- `@prisma/client` 6.7 — ORM
- `@supabase/supabase-js` 2.49 — 인증/스토리지
- `class-validator`, `class-transformer` — DTO 유효성 검사
- `socket.io` 4.8 — WebSocket
- `@nestjs/swagger` — API 문서 자동화

## 환경변수

```bash
NODE_ENV=development|production
DATABASE_URL=<Prisma 연결 문자열>
SUPABASE_URL=<Supabase 엔드포인트>
SUPABASE_KEY=<Supabase API 키>
```

## 테스트

- **프레임워크**: Jest (ts-jest preset)
- **환경**: Node.js
- **파일 패턴**: `**/__tests__/**/*.test.ts`, `**/*.spec.ts`
