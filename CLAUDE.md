# vegedot-web

microCMS を使った React Router v7 (Remix v3) の Web サイト。

詳細ルールは @.claude/rules/ を参照。

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | React Router v7（SSR）|
| 言語 | TypeScript（strict 必須）|
| スタイリング | Tailwind CSS v4 |
| CMS | microCMS（`microcms-js-sdk`）|
| パッケージマネージャー | pnpm（`npm` 禁止）|
| ルーティング記法 | remix-flat-routes |

## 開発コマンド

```bash
pnpm dev          # 開発サーバー起動（http://localhost:5173）
pnpm build        # プロダクションビルド
pnpm typecheck    # 型チェック（react-router typegen + tsc）
pnpm format:fix   # Prettier 自動修正
```

## 環境変数

`.env.example` をコピーして `.env` を作成する。
**`VITE_` プレフィックスは microCMS 認証情報に絶対使用禁止**（ブラウザに露出する）。

## ディレクトリ構成

```
app/
├── components/
│   └── shared/            # ページ横断コンポーネント
├── lib/
│   ├── microcms.server.ts # microCMS クライアント（サーバー専用）
│   └── utils.ts           # cn() 等のユーティリティ
└── routes/
    └── _public+/          # 公開ページ（remix-flat-routes 記法）
```

## 絶対ルール

- データ取得は必ずサーバーサイド `loader` で行う（`useEffect` + `fetch` 禁止）
- コンポーネントは props を受け取る純粋な UI のみ
- `any` 型禁止 → `unknown` を使う
- `npm` 禁止 → `pnpm` を使う
