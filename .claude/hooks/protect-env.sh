#!/bin/bash
# .env ファイルへの直接書き込みをブロックする
# .env.example は許可

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# .env ファイルへの書き込みをブロック（.env.example は除く）
if [[ "$FILE_PATH" =~ \.env$ ]] || [[ "$FILE_PATH" =~ \.env\.local$ ]] || [[ "$FILE_PATH" =~ \.env\.[^e] ]]; then
  echo "🚫 ブロック: $FILE_PATH への直接書き込みは禁止されています。" >&2
  echo "   .env.example を更新し、手動で .env にコピーしてください。" >&2
  exit 2
fi

exit 0
