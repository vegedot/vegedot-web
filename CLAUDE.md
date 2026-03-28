# vegedot-web

microCMS を使った Remix v3 の Web サイト。

詳細ルールは @.claude/rules/ を参照。

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Remix v3（`remix` パッケージ）|
| 言語 | TypeScript（strict 必須）|
| UI モデル | Remix Component（React **ではない**）|
| ルーター | `remix/fetch-router`（`route()` 関数で型安全）|
| CMS | microCMS（`microcms-js-sdk`）|
| パッケージマネージャー | npm（`npm install remix@next`）|

## 開発コマンド

```bash
npm run dev       # tsx watch server.ts
npm run build     # 本番ビルド（未定義の場合は tsx server.ts）
npm run typecheck # tsc --noEmit
npm test          # NODE_ENV=test tsx --test
```

## ディレクトリ構成

```
app/
├── assets/        # クライアントエントリポイント
├── controllers/   # ルートハンドラ + ルート固有 UI
├── data/          # microCMS クライアント・スキーマ・クエリ
├── middleware/    # 認証・セッション等のリクエストライフサイクル
├── ui/            # 複数ルートで共有するコンポーネント
├── utils/         # クロスレイヤーユーティリティ
├── routes.ts      # ルート定義（型安全コントラクト）
└── router.ts      # ルーターセットアップ
db/                # マイグレーション・SQLite ファイル
public/            # 静的ファイル
test/              # 共有テストヘルパー
tmp/               # ランタイム一時ファイル
server.ts          # HTTP サーバーエントリポイント
```

## 絶対ルール

- Remix Component を使う（React・Vue・Svelte 禁止）
- `npm` を使う（`pnpm`・`yarn` 禁止）
- コンポーネントは必ず二段階構成（setup → render 関数を返す）
- microCMS API キーはサーバーサイドのみ（`app/data/` 以下に限定）
- `app/lib/` `app/components/` 等の汎用バケツを作らない
