# tech — CLAUDE.md

> 기술 블로그 / 문서 사이트 | https://tech.zerovoyage.com

## 개요

- **패키지명**: `tech` v0.4.0
- **기술**: Docusaurus 3.8.1, TypeScript, React 19
- **기능**: 기술 문서, 학습 노트, 블로그 포스트

## 개발 명령어

```bash
# 루트에서
pnpm dev:tech       # Docusaurus start (포트 3000)

# 앱 디렉토리에서
pnpm start          # 개발 서버
pnpm build          # 정적 사이트 빌드
pnpm serve          # 빌드 결과 서빙
pnpm clear          # Docusaurus 캐시 삭제
pnpm deploy         # 빌드 + 배포
```

## 소스 구조

```
docs/               # 마크다운 문서 (카테고리별)
blog/               # 블로그 포스트
src/
├── components/     # 커스텀 React 컴포넌트
├── css/            # 커스텀 스타일
└── pages/          # 커스텀 페이지
static/
├── katex/          # 수식 렌더링 에셋
└── img/            # 이미지
.scripts/
└── deploy.sh       # 배포 스크립트
```

## 문서 카테고리

- TypeScript
- React
- 네트워크
- 웹
- 자바스크립트
- 데이터베이스

## 주요 의존성

- `@docusaurus/core` 3.8.1
- `@docusaurus/preset-classic`
- `@docusaurus/theme-live-codeblock` — 라이브 코드 실행
- `@easyops-cn/docusaurus-search-local` — 로컬 검색

## 특이사항

- **Vite가 아닌 Docusaurus** 기반 — 다른 앱과 빌드 방식 다름
- `dev` 스크립트가 아닌 `start` 스크립트로 개발 서버 실행 (`pnpm dev:tech` 는 `start` 호출)
- 문서 작성 규칙은 `.docs/tech_rule.md` 참고
- React 19 사용 (다른 프론트엔드 앱은 18.x)
