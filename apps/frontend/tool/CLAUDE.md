# tool — CLAUDE.md

> 미디어 처리 유틸리티 | https://tool.zerovoyage.com

## 개요

- **패키지명**: `tool` v0.3.0
- **기술**: React 18.3, Vite, TailwindCSS, Shadcn/UI, FFmpeg.wasm
- **기능**: 이미지 병합, 비디오→GIF 변환, 비밀번호 생성기

## 개발 명령어

```bash
# 루트에서
pnpm dev:tool

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
│   ├── merge-image/        # 이미지 세로 병합
│   ├── gif-generator/      # 비디오 → GIF 변환
│   └── password-generator/ # 비밀번호 생성기
├── components/
│   ├── common/
│   │   ├── header/
│   │   ├── footer/
│   │   └── page-title/
│   ├── layout/
│   │   └── root-layout/
│   └── input/
│       ├── image-uploader/
│       └── video-uploader/
├── apis/
│   ├── health/
│   └── _client/
└── root-router.tsx
```

## 경로 별칭

| 별칭 | 실제 경로 |
|---|---|
| `@/*` | `./src/*` |

## 주요 의존성

- `@ffmpeg/ffmpeg`, `@ffmpeg/util` — 브라우저 내 미디어 처리
- `@packages/vds` — 공유 UI 컴포넌트
- `@packages/api-client` — HTTP 클라이언트
- `file-saver` — 파일 다운로드

## 특이사항

- `vite.config.ts` 에 COEP/COOP 헤더 설정 (FFmpeg.wasm의 SharedArrayBuffer 필요)
- 빌드는 커스텀 쉘 스크립트 사용 (`pnpm build`)
- FFmpeg 처리는 Web Worker에서 실행 — UI 블로킹 없음
