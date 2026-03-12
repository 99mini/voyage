#!/bin/bash

# ==============================================================================
# Obsidian to GitHub Publish Pipeline (Auto-Sync Mode)
# ==============================================================================
# 1. 환경 변수 로드
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(dirname "$SCRIPT_DIR")"
REPO_ROOT="$(dirname "$(dirname "$APP_DIR")")"

# .env 파일 로드 함수 (공백 및 따옴표 처리)
load_env() {
    local env_file=$1
    if [ -f "$env_file" ]; then
        set -a
        source "$env_file"
        set +a
    fi
}

# .env 파일 위치 확인 및 로드
if [ -f "$APP_DIR/.env" ]; then
    load_env "$APP_DIR/.env"
elif [ -f "$REPO_ROOT/.env" ]; then
    load_env "$REPO_ROOT/.env"
fi


if [ -z "$OBSIDIAN_VAULT_PATH" ]; then
    echo "❌ 에러: .env 파일에 OBSIDIAN_VAULT_PATH가 설정되지 않았습니다."
    exit 1
fi

OBSIDIAN_BASE="$OBSIDIAN_VAULT_PATH/voyage-tech"

# 2. 작업 대상 파일 식별 (확장자 매핑 및 Diff 기반)
FILES_TO_SYNC=() # 형식: "SourceRelPath:TargetRelPath"
DRY_RUN=false
INPUT_FILE=""

# 인자 파싱
for arg in "$@"; do
    if [[ "$arg" == "--dry-run" ]]; then
        DRY_RUN=true
    else
        INPUT_FILE="$arg"
    fi
done

if [ "$DRY_RUN" = true ]; then
    echo "🧪 Dry-run 모드 활성: 로컬 작업만 수행하고 PR을 생성하지 않습니다."
fi

# 현재 브랜치 확인
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "🔍 옵시디언과 저장소 간의 변경 사항을 비교 중..."

if [ -n "$INPUT_FILE" ]; then
    # 특정 파일이 지정된 경우 (확장자 자동 탐색)
    BASENAME=$(basename "$INPUT_FILE" .md)
    DIRNAME=$(dirname "$INPUT_FILE")
    [ "$DIRNAME" == "." ] && DIRNAME="" # 루트인 경우 처리

    # 레포지토리 내 기존 파일 확인
    if [ -f "$APP_DIR/$DIRNAME/$BASENAME.mdx" ]; then
        FILES_TO_SYNC+=("$DIRNAME/$BASENAME.md:$DIRNAME/$BASENAME.mdx")
    else
        FILES_TO_SYNC+=("$DIRNAME/$BASENAME.md:$DIRNAME/$BASENAME.md")
    fi
else
    # 옵시디언 내 모든 md 파일 탐색 및 레포지토리와 비교
    while IFS= read -r src_file; do
        REL_PATH=${src_file#$OBSIDIAN_BASE/}
        BASE_REL=${REL_PATH%.md}

        TARGET_REL=""
        if [ -f "$APP_DIR/${BASE_REL}.mdx" ]; then
            TARGET_REL="${BASE_REL}.mdx"
        elif [ -f "$APP_DIR/${BASE_REL}.md" ]; then
            TARGET_REL="${BASE_REL}.md"
        else
            # 신규 파일인 경우 (기존 파일이 없으면 .md 유지)
            TARGET_REL="${BASE_REL}.md"
        fi

        # 내용 비교 (cmp 사용)
        if [ ! -f "$APP_DIR/$TARGET_REL" ] || ! cmp -s "$src_file" "$APP_DIR/$TARGET_REL"; then
            FILES_TO_SYNC+=("$REL_PATH:$TARGET_REL")
        fi
    done < <(find "$OBSIDIAN_BASE" -name "*.md")
fi

if [ "${#FILES_TO_SYNC[@]}" -eq 0 ]; then
    echo "✅ 동기화할 변경 사항이 없습니다. (저장소가 이미 최신 상태입니다)"
    exit 0
fi

echo "📋 동기화 대상 파일 (${#FILES_TO_SYNC[@]}개):"
for item in "${FILES_TO_SYNC[@]}"; do
    echo " - ${item#*:}"
done

# 3. Git 준비
cd "$REPO_ROOT"

if [ "$DRY_RUN" = true ]; then
    echo "✨ [Dry-run] Git 브랜치 작업을 건너뜁니다."
    BRANCH_NAME="$CURRENT_BRANCH"
else
    if [ "$CURRENT_BRANCH" == "main" ]; then
        echo "🔄 main 브랜치에서 새 작업 브랜치를 생성합니다..."
        git checkout main
        git pull origin main
        TIMESTAMP=$(date +%Y%m%d%H%M)
        BRANCH_NAME="sync/obsidian-$TIMESTAMP"
        git checkout -b "$BRANCH_NAME"
    else
        echo "🌿 현재 브랜치($CURRENT_BRANCH)에서 동기화를 진행합니다."
        BRANCH_NAME="$CURRENT_BRANCH"
    fi
fi

# 4. 파일 동기화 루프
SYNC_COUNT=0
for item in "${FILES_TO_SYNC[@]}"; do
    SRC_REL="${item%%:*}"
    TGT_REL="${item#*:}"
    SRC_PATH="$OBSIDIAN_BASE/$SRC_REL"
    TGT_PATH="$APP_DIR/$TGT_REL"

    if [ ! -f "$SRC_PATH" ]; then
        echo "⚠️ 경고: 소스 파일을 찾을 수 없음: $SRC_PATH"
        continue
    fi

    # 대상 디렉토리 생성 및 복사 (내용만 덮어씀)
    mkdir -p "$(dirname "$TGT_PATH")"
    cp "$SRC_PATH" "$TGT_PATH"

    echo "✅ 최신화 완료: $TGT_REL"
    ((SYNC_COUNT++))
done
if [ "$SYNC_COUNT" -eq 0 ]; then
    echo "❌ 동기화된 파일이 없습니다. 종료합니다."
    [ "$DRY_RUN" = false ] && [ "$CURRENT_BRANCH" == "main" ] && git checkout main && git branch -D "$BRANCH_NAME"
    exit 1
fi

# 5. 커밋 및 푸시
if [ "$DRY_RUN" = true ]; then
    echo "✨ [Dry-run] 모든 파일 복사가 완료되었습니다. (Git 커밋/푸시/PR 생성을 건너뜁니다)"
    echo "📝 로컬 파일 변경 사항을 확인해 보세요."
    exit 0
fi

git add .
git commit -m "docs: sync $SYNC_COUNT files from obsidian ($TIMESTAMP)"
git push origin "$BRANCH_NAME"

# 6. GitHub PR 생성
echo "🚀 GitHub PR 생성 중..."
gh pr create \
    --title "📝 [Sync] Obsidian 최근 수정 콘텐츠 업데이트 ($TIMESTAMP)" \
    --body "Obsidian에서 수정된 $SYNC_COUNT개의 파일을 자동 동기화했습니다. \n\n### 대상 파일:\n$(printf -- '- %s\n' "${FILES_TO_SYNC[@]}")" \
    --base main \
    --head "$BRANCH_NAME"

echo "🎉 모든 작업이 완료되었습니다! ($SYNC_COUNT개 파일 PR 생성됨)"

