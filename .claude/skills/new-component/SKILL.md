---
name: new-component
description: shared コンポーネントを作成する
user-invocable: true
allowed-tools: Read, Write, Glob
---

# new-component スキル

`$ARGUMENTS` の形式: `<コンポーネント名>`
例: `/new-component ArticleCard`

## 手順

1. **コンポーネントファイルを作成する** → `app/components/shared/<kebab-case名>.tsx`

   テンプレート:
   ```typescript
   interface <ComponentName>Props {
     // TODO: props を定義する
   }

   export function <ComponentName>({ ... }: <ComponentName>Props): React.ReactElement {
     return (
       <div>
         {/* TODO */}
       </div>
     )
   }
   ```

2. **規約を守る**
   - props の型は `interface` で同ファイルに定義
   - 戻り値型 `React.ReactElement` を明示
   - データ取得ロジックは含めない（props で受け取る）
   - Tailwind CSS クラスは `cn()` でマージする（`~/lib/utils`）

3. **確認する**
   - 作成したファイルパスをユーザーに報告する
