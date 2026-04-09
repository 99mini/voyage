# CLAUDE.md

> AI 어시스턴트를 위한 Voyage 모노레포 가이드 인덱스

## 빠른 참조

| 문서 | 내용 |
|---|---|
| [구조](/.claude/structure.md) | 디렉토리 구조, 앱/패키지 목록 |
| [기술 스택](/.claude/tech-stack.md) | 언어, 프레임워크, 도구 |
| [개발 컨벤션](/.claude/conventions.md) | 코드 스타일, 패턴, 규칙 |
| [Git 규칙](/.claude/git.md) | 커밋 메시지, 브랜치 전략 |
| [CI/CD](/.claude/ci-cd.md) | 배포 파이프라인, GitHub Actions |

## 앱별 가이드

| 앱 | 문서 |
|---|---|
| `apps/frontend/about` | [CLAUDE.md](apps/frontend/about/CLAUDE.md) |
| `apps/frontend/tool` | [CLAUDE.md](apps/frontend/tool/CLAUDE.md) |
| `apps/frontend/tech` | [CLAUDE.md](apps/frontend/tech/CLAUDE.md) |
| `apps/frontend/admin` | [CLAUDE.md](apps/frontend/admin/CLAUDE.md) |
| `apps/frontend/awesome` | [CLAUDE.md](apps/frontend/awesome/CLAUDE.md) |
| `apps/frontend/line-art-coloring` | [CLAUDE.md](apps/frontend/line-art-coloring/CLAUDE.md) |
| `apps/server/rest` | [CLAUDE.md](apps/server/rest/CLAUDE.md) |
| `apps/server/functions` | [CLAUDE.md](apps/server/functions/CLAUDE.md) |
| `packages/vds` | [CLAUDE.md](packages/vds/CLAUDE.md) |
| `packages/api-client` | [CLAUDE.md](packages/api-client/CLAUDE.md) |
| `packages/pb-api` | [CLAUDE.md](packages/pb-api/CLAUDE.md) |

## 핵심 규칙 (반드시 준수)

1. **커밋 메시지는 영어로** — Conventional Commits 형식 (`feat(scope): description`)
2. **`React.FC` 사용 금지** — 컴포넌트 타입은 직접 함수 시그니처 사용
3. **상대 경로 import 금지** — 항상 `@/*` 별칭 사용
4. **UI 컴포넌트는 `packages/vds` 우선** — 없으면 VDS에 추가
5. **루트 패키지 의존성 중복 설치 금지** — 루트 `package.json` 확인 후 설치
6. **PRD 파일 수정 금지** — `_docs/PRD.md` 는 읽기 전용
7. **커밋은 기능 단위로 분리** — 한 번에 모든 변경사항 커밋 금지
