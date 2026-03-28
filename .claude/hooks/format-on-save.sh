#!/bin/bash
# Edit / Write 後に Prettier で自動フォーマットする
# node_modules がない場合やフォーマット対象外のファイルは静かにスキップ

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Prettier 対象拡張子のみ処理
if [[ ! "$FILE_PATH" =~ \.(ts|tsx|js|jsx|json|css|md|yaml|yml)$ ]]; then
  exit 0
fi

# node_modules/.bin/prettier が存在する場合のみ実行
PRETTIER="$(pwd)/node_modules/.bin/prettier"
if [ ! -f "$PRETTIER" ]; then
  exit 0
fi

# フォーマット実行（エラーは無視）
"$PRETTIER" --write "$FILE_PATH" 2>/dev/null

exit 0
