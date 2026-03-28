# TypeScript ルール

このプロジェクトの TypeScript 規約。

## 必須設定（tsconfig.json）

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitReturns": true
}
```

## 型の書き方

- `any` 禁止 → `unknown` を使う
- `as` キャストは極力避ける（型ガードで絞り込む）
- 関数の戻り値型は必ず明示する
- オブジェクト型は `interface` で定義する（型エイリアスより優先）
- パスエイリアス: `~/` → `./app/`

```typescript
// ✅ 正しい
export async function loader(_: Route.LoaderArgs): Promise<{ articles: Article[] }> { ... }

// ❌ 禁止
export async function loader(_: any) { ... }
```

## React コンポーネント

- 戻り値型は `React.ReactElement` を明示する
- props の型は `interface` で定義してコンポーネントと同ファイルに置く

```typescript
interface ArticleListProps {
  articles: Article[]
}

export function ArticleList({ articles }: ArticleListProps): React.ReactElement { ... }
```
