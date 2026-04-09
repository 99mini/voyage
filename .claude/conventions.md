# 개발 컨벤션

## TypeScript

- **strict 모드** 항상 활성화
- `tsconfig.base.json` 을 모든 패키지에서 extends
- 경로 별칭 필수 사용:
  - 프론트엔드: `@/*` → `./src/*`
  - 서버: `@server-rest/*` → `./src/*`
  - 패키지: `@packages/*` (워크스페이스 패키지 참조)

## 컴포넌트

```tsx
// ✅ 올바른 방식
function MyComponent({ title }: { title: string }) {
  return <div>{title}</div>;
}

// ❌ 금지 — React.FC 사용 금지
const MyComponent: React.FC<{ title: string }> = ({ title }) => {
  return <div>{title}</div>;
};
```

## Import 규칙

- **상대 경로 import 금지** — 반드시 `@/*` 별칭 사용
- ESLint `eslint-plugin-no-relative-import-paths` 로 강제
- Prettier의 `@trivago/prettier-plugin-sort-imports`가 아래 순서로 정렬:

```
1. react, react-dom, react-query, zustand, lucide-react, @radix-ui
2. @emotion, @packages, @nestjs, @server-rest
3. @/apis, @/pages, @/routes, @/components
4. @/contexts, @/hooks, @/types, @/lib, @/utils
5. ./ 로컬 (DDD 순서: modules → controllers → services → entities → dto)
```

## 프론트엔드 패턴

### 폴더 구조 (Page Driven Development)

```
src/
├── pages/[page-name]/
│   ├── components/   # 해당 페이지 전용
│   ├── hooks/
│   └── utils/
├── components/       # 앱 공통
├── hooks/
├── apis/
└── lib/
```

### 상태 관리

- **전역 상태**: Zustand
- **서버/비동기 상태**: `@tanstack/react-query`
- Context는 인증, 테마 등 앱 전역 설정에만 사용

### UI 컴포넌트 우선순위

1. `packages/vds` — 이미 있으면 반드시 사용
2. `packages/vds` 에 없고 공통 사용 예정 → VDS에 새로 추가
3. 새 컴포넌트 작성 시 → `npx shadcn` CLI 활용
4. 앱 전용 컴포넌트 → 해당 앱 `src/components/` 또는 페이지 폴더 안에 작성

## 백엔드 패턴

### DDD 모듈 구조

```
src/modules/[도메인]/[서브도메인]/
├── dto/
│   ├── create-[name].dto.ts
│   └── update-[name].dto.ts
├── entities/
│   └── [name].entity.ts
├── [name].controller.ts
├── [name].service.ts
└── [name].module.ts
```

- 각 컨트롤러는 최소한의 로직만 가짐 (라우팅/유효성 검사)
- 비즈니스 로직은 서비스에 집중
- DTO에는 `class-validator` 데코레이터 사용

## 패키지 관리

- **루트 `package.json`에 이미 설치된 패키지를 하위 패키지에 중복 설치 금지**
- 새 패키지 추가 전 루트 `devDependencies` 확인
- pnpm 워크스페이스 참조: `"@packages/vds": "workspace:*"`

## 포매팅 (Prettier)

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 120
}
```

커밋 전 반드시 실행:
```bash
pnpm format
```

## 테스트

### 프론트엔드 (Vitest)

- 테스트 파일: `*.test.ts`, `*.test.tsx`
- 소스 파일과 같은 디렉토리에 위치 (colocated)
- 실행: `pnpm test` (루트) 또는 해당 앱에서 `pnpm test`

### 백엔드 (Jest)

- 설정: `jest.config.ts` (ts-jest preset)
- 환경: Node.js
- 파일 패턴: `**/__tests__/**/*.test.ts`, `**/*.spec.ts`
- 실행: `cd apps/server/rest && pnpm test`
- 커버리지: `pnpm test:coverage`
