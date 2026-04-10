# CI/CD

## GitHub Actions 워크플로우

`.github/workflows/` 에 앱별 배포 워크플로우가 있습니다.

| 워크플로우 파일 | 트리거 브랜치 | 대상 |
|---|---|---|
| `deploy-tool.yml` | `tool/release/**` | tool 앱 |
| `deploy-tech.yml` | `tech/release/**` | tech 앱 |
| `deploy-admin.yml` | `admin/release/**` | admin 앱 |
| `deploy-awesome.yml` | `awesome/release/**` | awesome 앱 |
| `deploy-line-art.yml` | `line-art-coloring/release/**` | line-art-coloring 앱 |
| `deploy-tool-dev.yml` | `tool/dev-release` | tool 개발 환경 |

> **참고**: `about` 앱은 현재 GitHub Actions 자동 배포 워크플로우가 없습니다. 수동 배포(`pnpm deploy:about`) 를 사용하세요.

## 배포 파이프라인

```
push to <app>/release/**
    ↓
GitHub Actions 트리거
    ↓
1. Node.js 20.x + pnpm 설정 (corepack)
    ↓
2. pnpm install
    ↓
3. pnpm run build:<app>
    ↓
4. SSH → DigitalOcean Droplet 파일 업로드
    ↓
5. pnpm run deploy:<app>
```

## 배포 스크립트

각 앱의 `.scripts/deploy.sh` 에 배포 로직이 있습니다:
- SSH 키 설정
- 빌드 파일 전송
- `--clean` 플래그로 클린 배포 지원

## 루트 배포 스크립트

```bash
pnpm deploy:about       # about 앱 배포
pnpm deploy:tool        # tool 앱 배포
pnpm deploy:tech        # tech 앱 배포
pnpm deploy:admin       # admin 앱 배포
pnpm deploy:awesome     # awesome 앱 배포
pnpm deploy:line-art    # line-art-coloring 앱 배포
pnpm deploy:fe          # 모든 프론트엔드 배포
pnpm deploy:func        # DigitalOcean Functions 배포
pnpm deploy:rest        # REST API 배포
```

## 서버 상태 확인

```bash
pnpm check-server       # .script/check-server.sh 실행
```
