# Obsidian-GitHub 블로그 게시 파이프라인 계획 (2026-03-13)

## 1. 개요
옵시디언(Obsidian)에서 작성한 기술 블로그 글을 로컬 개발 저장소(`voyage`)로 동기화하고, GitHub CLI(`gh`)를 사용하여 브랜치 생성 및 PR 작성을 자동화하는 파이프라인을 구축한다.

## 2. 주요 환경 설정
- **Obsidian Vault 경로**: `.env` 파일의 `OBSIDIAN_VAULT_PATH` 변수 사용
- **프로젝트 저장소 경로**: `/Users/youngmin/dev/voyage`
- **대상 경로**:
    - 블로그: `apps/frontend/tech/blog/`
    - 문서: `apps/frontend/tech/docs/`
- **의존성 도구**:
    - `obsidian` CLI: 파일 상태 확인 및 보관소 제어
    - `gh` CLI: GitHub Pull Request 생성 및 관리
    - `rsync`: 파일 동기화

## 3. 자동화 워크플로우 (Pipeline)
... (중략)

## 4. 자동화 스크립트 초안 (`.scripts/publish-obsidian.sh`)
```bash
#!/bin/bash

# .env 파일 로드 (현재 디렉토리 기준)
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# 사용자 입력: 파일명 (경로 포함 가능)
SOURCE_FILE=$1

if [ -z "$SOURCE_FILE" ]; then
    echo "사용법: ./publish-obsidian.sh [파일명]"
    exit 1
fi

if [ -z "$OBSIDIAN_VAULT_PATH" ]; then
    echo "에러: .env 파일에 OBSIDIAN_VAULT_PATH가 설정되지 않았습니다."
    exit 1
fi

# 경로 정의
OBSIDIAN_BASE="$OBSIDIAN_VAULT_PATH/voyage-tech"
REPO_BASE="/Users/youngmin/dev/voyage"

# 1. 파일 복사 (blog 폴더 기준 예시)
cp "$OBSIDIAN_BASE/blog/$SOURCE_FILE" "$REPO_BASE/apps/frontend/tech/blog/"

# 2. Git 작업
cd $REPO_BASE
git checkout main
git pull origin main
BRANCH_NAME="content/$(basename "$SOURCE_FILE" .md)"
git checkout -b "$BRANCH_NAME"

# 3. 커밋 및 푸시
git add .
git commit -m "docs: sync $SOURCE_FILE from obsidian"
git push origin "$BRANCH_NAME"

# 4. PR 생성
gh pr create --title "📝 새 글 추가: $SOURCE_FILE" --body "Obsidian CLI를 통해 자동 생성된 PR입니다." --base main
```

## 5. 향후 확장 기능
- **이미지 자동 처리**: 글에 포함된 로컬 이미지 자산을 `static/img`로 자동 이동 및 경로 치환.
- **상태 검사**: `obsidian properties` 명령어를 통해 `published: true`인 파일만 추출하여 배치 처리.
- **알림**: PR 생성 완료 후 시스템 알림 또는 브라우저 자동 열기.
