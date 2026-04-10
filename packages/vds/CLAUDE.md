# packages/vds — CLAUDE.md

> Voyage Design System | https://design.zerovoyage.com

## 개요

- **패키지명**: `@packages/vds` v0.1.2
- **기술**: React 18.3, TypeScript, TailwindCSS, Shadcn/UI, Rollup, Storybook
- **출력**: ESM (`dist/index.mjs`) + CJS (`dist/index.cjs`) + 타입 (`dist/index.d.ts`)

## 개발 명령어

```bash
# 루트에서
pnpm dev:vds        # Rollup watch 모드

# 패키지 디렉토리에서
pnpm build          # 빌드 (dist/ 생성)
pnpm dev            # Rollup watch
pnpm storybook      # Storybook 개발 서버 (포트 6006)
pnpm build:storybook
pnpm deploy:storybook
```

## 소스 구조

```
src/
├── components/             # 공유 UI 컴포넌트
│   ├── button/
│   ├── input/
│   ├── label/
│   ├── grid/
│   ├── grid-item/
│   ├── grid-context/
│   ├── file-input/
│   ├── file-uploader/
│   ├── image-preview-group/
│   ├── image-previewer/
│   ├── page-progress/
│   └── ui/                 # Shadcn/UI 기본 컴포넌트
├── hooks/                  # 공유 훅
├── plugin/                 # TailwindCSS 플러그인
├── lib/                    # 유틸리티
├── foundations/            # Storybook 기초 스토리
└── index.ts                # 공개 API 진입점
.storybook/                 # Storybook 설정
```

## 컴포넌트 추가 규칙

1. `src/components/[component-name]/` 폴더 생성
2. 컴포넌트 파일: `[component-name].tsx`
3. 스토리 파일: `[component-name].stories.tsx`
4. 테스트 파일: `[component-name].test.tsx`
5. `src/index.ts` 에 export 추가

## 경로 별칭

| 별칭 | 실제 경로 |
|---|---|
| `@/*` | `./src/*` |

## 빌드 설정 (rollup.config.cjs)

- **입력**: `src/index.ts`
- **출력**: ESM + CJS 듀얼
- **외부 처리**: `react`, `react-dom` (peer dependency)
- **타입 선언**: `rollup-plugin-dts` 사용

## 앱에서 사용하는 법

```tsx
import { Button, Input, FileUploader } from '@packages/vds';
```

## 특이사항

- **peer dependencies**: `react` 18.3.1, `react-dom` 18.3.1
- TailwindCSS 플러그인 포함 (`src/plugin/`) — 소비 앱의 `tailwind.config.js` 에서 import 필요
- Storybook으로 컴포넌트 문서화 및 시각적 테스트
