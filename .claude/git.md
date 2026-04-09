# Git 규칙

## 커밋 메시지

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 규칙을 따릅니다.

```
<type>(<scope>): <description>

[optional body]
```

- **언어**: 반드시 영어
- **스코프**: 폴더 이름 사용 (예: `frontend`, `server`, `packages/vds`, `frontend/tool`, `server/rest`)
- **분리**: 기능별로 커밋 분리 — 한 번에 모든 변경사항 커밋 금지
- **상세 내용**: 제목이 길어지면 body(description) 활용

### 커밋 타입

| 타입 | 설명 |
|---|---|
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `chore` | 빌드/의존성/설정 변경 |
| `docs` | 문서 추가/수정 |
| `refactor` | 기능 변경 없는 코드 리팩토링 |
| `test` | 테스트 추가/수정 |
| `release` | 릴리즈 커밋 |
| `style` | 포매팅, 세미콜론 등 (코드 변경 없음) |

### 예시

```bash
feat(frontend/tool): add QR code generator page
fix(server/rest): handle null response in user service
chore(deps): bump vite from 6.3.6 to 6.4.1
docs(packages/vds): add GridItem component documentation
refactor(server/rest): extract file upload logic to service
```

## 브랜치 전략

### 브랜치 유형

| 유형 | 패턴 | 예시 |
|---|---|---|
| 프로덕션 릴리즈 | `<app>/release` | `tool/release` |
| 버전 릴리즈 | `<app>/release/x.x.x` | `tool/release/0.3.0` |
| 개발 릴리즈 | `<app>/dev-release` | `tool/dev-release` |
| 기능 개발 | `<app>/feature/**` | `tool/feature/add-qr-generator` |
| 버그 수정 | `<app>/bugfix/**` | `vds/bugfix/fix-grid-overflow` |
| 전체 chore | `chore/**` | `chore/update-root-dependencies` |
| 앱별 chore | `<app>/chore/**` | `tool/chore/update-dependencies` |
| 전체 docs | `docs/**` | `docs/update-root-readme` |
| 앱별 docs | `<app>/docs/**` | `tool/docs/create-readme` |

### Git Flow

```
main
 └── <app>/release              ← 완성 시 main에 merge
       └── <app>/feature/**     ← 기능 완성 시 release에 merge
```

1. `<app>/[dev-]release` 브랜치 생성 (main에서)
2. `<app>/feature/**` 또는 `<app>/bugfix/**` 브랜치 생성 (release에서)
3. 기능/수정 완료 → release 브랜치에 merge
4. 프로덕션 배포 시 → main에 merge (CI/CD 트리거)

## 주의사항

- `main` 브랜치에 직접 push 금지
- 프로덕션 배포는 `<app>/release/**` 브랜치에 push 시 CI/CD가 자동 실행
