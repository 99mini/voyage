# 기술 스택

## 공통

| 항목 | 버전/내용 |
|---|---|
| 언어 | TypeScript 5.8.3 (strict 모드) |
| 패키지 매니저 | pnpm 10.12.4 |
| Node.js | 20.0+ |
| 린팅 | ESLint 9.19.0 + @typescript-eslint |
| 포매팅 | Prettier 3.0.0 |
| 테스트 (프론트) | Vitest 3.2.4 |
| 테스트 (백엔드) | Jest 29.7.0 |

## 프론트엔드

| 항목 | 라이브러리/버전 |
|---|---|
| UI 프레임워크 | React 18.2 ~ 18.3 |
| 번들러 | Vite 6.4.1 |
| 라우팅 | React Router 7.12.0 |
| 스타일링 | TailwindCSS 3.4+ |
| 컴포넌트 | Shadcn/UI, Radix UI |
| 아이콘 | Lucide React |
| 전역 상태 | Zustand |
| 서버 상태 | @tanstack/react-query 3.39.3 |
| 시각화 | D3.js 7.9 |
| 미디어 처리 | FFmpeg.wasm 0.10 |
| 기술 문서 | Docusaurus 3.8.1 (tech 앱 전용) |

## 백엔드

| 항목 | 라이브러리/버전 |
|---|---|
| 프레임워크 | NestJS 11.0+ |
| HTTP 서버 | Express 4.21.2 |
| ORM | Prisma 6.7.0 |
| 외부 서비스 | Supabase SDK 2.49.4 |
| 실시간 통신 | Socket.io 4.8.1 |
| 데이터베이스 | PocketBase 0.25.1 |
| API 문서 | @nestjs/swagger |
| 유효성 검사 | class-validator, class-transformer |
| 프로세스 관리 | PM2 6.0.9 |
| 서버리스 | DigitalOcean Functions (nodejs:18 런타임) |

## 빌드 도구 (라이브러리 패키지)

| 항목 | 내용 |
|---|---|
| 번들러 | Rollup 4.59.0 |
| 출력 형식 | ESM (`dist/index.mjs`) + CJS (`dist/index.cjs`) |
| 타입 선언 | `dist/index.d.ts` |
| 플러그인 | @rollup/plugin-typescript, rollup-plugin-dts, @rollup/plugin-terser |

## 인프라

| 항목 | 내용 |
|---|---|
| 호스팅 | DigitalOcean Droplet (프론트엔드/백엔드) |
| 서버리스 | DigitalOcean Functions |
| 스토리지 | DigitalOcean Volumes |
| CI/CD | GitHub Actions |
| 인증/DB | Supabase |
| 데이터베이스 | PocketBase, Prisma (PostgreSQL) |
