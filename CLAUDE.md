# vegedot-web

microCMS を使った React Router v7 (Remix v3) の Web サイト。

## 技術スタック

- **フレームワーク**: React Router v7 (Remix v3) + SSR
- **言語**: TypeScript（strict モード必須）
- **スタイリング**: Tailwind CSS v4
- **UI コンポーネント**: shadcn/ui（`~/components/ui/`）
- **CMS**: microCMS（`microcms-js-sdk`）
- **テスト**: Vitest + Storybook
- **パッケージマネージャー**: pnpm

## 開発コマンド

```bash
pnpm dev          # 開発サーバー起動（localhost:5173）
pnpm build        # プロダクションビルド
pnpm typecheck    # 型チェック（react-router typegen + tsc）
pnpm format       # フォーマット確認
pnpm format:fix   # フォーマット修正
pnpm storybook    # Storybook 起動
```

## 環境変数

`.env.example` を参照。`.env` を作成して設定する。

| 変数名                     | 説明                                    |
| -------------------------- | --------------------------------------- |
| `MICROCMS_SERVICE_DOMAIN`  | microCMS のサービスドメイン             |
| `MICROCMS_API_KEY`         | microCMS の API キー                    |

**注意**: `VITE_` プレフィックスを付けると APIキーがブラウザに露出するため使用禁止。

## ディレクトリ構成

```
app/
├── components/
│   ├── shared/     # ページ横断のコンポーネント
│   └── ui/         # shadcn/ui コンポーネント（直接編集しない）
├── lib/
│   ├── microcms.server.ts  # microCMS クライアント（サーバー専用）
│   └── utils.ts            # 汎用ユーティリティ（cn関数等）
├── routes/
│   └── _public+/   # 公開ページ（remix-flat-routes 記法）
├── root.tsx
└── routes.ts
```

## アーキテクチャパターン

### データ取得はサーバーサイド loader で行う

```typescript
// routes/_public+/index.tsx
export async function loader(): Promise<{ articles: Article[] }> {
  const data = await microcms.getList<Article>({ endpoint: 'articles' })
  return { articles: data.contents }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  // loaderData を props として受け取る
}
```

- `useEffect` + `fetch` によるクライアントサイドデータ取得は原則禁止
- microCMS APIキーはサーバー側でのみ使用（`*.server.ts`ファイル）

### コンポーネント設計

- データ取得ロジックはルートの `loader` に集約する
- コンポーネントは props を受け取る純粋な UI に保つ
- カスタムフックはブラウザ API（`useEffect`, `useState`）が必要な UI 状態にのみ使う

### ルーティング

remix-flat-routes の記法を使用:
- `_public+/_layout.tsx` → 公開ページのレイアウト
- `_public+/index.tsx` → `/`
- `_public+/articles.$id.tsx` → `/articles/:id`

## TypeScript ルール

- `strict: true` 必須（設定済み）
- `any` 型禁止 → `unknown` を使う
- `as` キャストは極力避ける
- 関数の戻り値型は明示する（特に loader / action）
- パスエイリアス: `~/` → `./app/`

## microCMS 型定義

新しいコンテンツ型は `app/lib/microcms.server.ts` に追加する:

```typescript
export interface Article {
  id: string
  title: string
  body: string
  publishedAt?: string
  updatedAt?: string
}
```

## shadcn/ui の使い方

`app/components/ui/` のファイルは直接編集しない。
新しいコンポーネントが必要な場合は公式 CLI を使う:

```bash
pnpm dlx shadcn@latest add <component-name>
```
