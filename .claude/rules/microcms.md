# microCMS ルール

## クライアント設定

`app/lib/microcms.server.ts` のみで microCMS クライアントを初期化する。

```typescript
import { createClient } from 'microcms-js-sdk'

export const microcms = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
})
```

## 環境変数

| 変数名 | 説明 |
|---|---|
| `MICROCMS_SERVICE_DOMAIN` | サービスドメイン（例: `vegedot-web`）|
| `MICROCMS_API_KEY` | API キー |

**絶対禁止**: `VITE_MICROCMS_*` という名前はブラウザに露出するため使用禁止。

## 型定義

コンテンツ型は `app/lib/microcms.server.ts` に追加する。
microCMS の共通フィールド（`id`, `createdAt`, `updatedAt`, `publishedAt`, `revisedAt`）は必ず含める。

```typescript
export interface Article {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  body: string
  eyecatch?: { url: string; height: number; width: number }
  category?: Category
}
```

## API 呼び出しパターン

```typescript
// 一覧取得
const data = await microcms.getList<Article>({
  endpoint: 'articles',
  queries: { limit: 20, orders: '-publishedAt' },
})

// 詳細取得
const article = await microcms.getListDetail<Article>({
  endpoint: 'articles',
  contentId: params.id,
})
```
