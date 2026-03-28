# microCMS ルール

## クライアント配置

`app/data/microcms.ts` にクライアントを置く（`.server.ts` 不要、サーバーサイド専用は `app/data/` に置く規約で担保）。

```ts
// app/data/microcms.ts
import { createClient } from 'microcms-js-sdk'

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
const apiKey = process.env.MICROCMS_API_KEY

if (!serviceDomain) throw new Error('MICROCMS_SERVICE_DOMAIN is not defined')
if (!apiKey) throw new Error('MICROCMS_API_KEY is not defined')

export const microcms = createClient({ serviceDomain, apiKey })
```

## 環境変数

| 変数名 | 説明 |
|---|---|
| `MICROCMS_SERVICE_DOMAIN` | サービスドメイン（例: `vegedot-web`）|
| `MICROCMS_API_KEY` | API キー |

**禁止**: クライアントサイドのバンドルに含まれるコードで `MICROCMS_API_KEY` を使わない。

## 型定義

```ts
// app/data/types.ts
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

export interface Category {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
}
```

## Remix v3 でのデータ取得パターン

ルートハンドラ内でフェッチし、コンポーネントに渡す:

```ts
// app/controllers/articles.tsx
import { microcms } from '../data/microcms.ts'
import type { Article } from '../data/types.ts'

export async function handler(context: Context): Promise<Response> {
  const data = await microcms.getList<Article>({
    endpoint: 'articles',
    queries: { limit: 20, orders: '-publishedAt' },
  })
  return renderHTML(<ArticlesPage articles={data.contents} />)
}
```

## API 呼び出しパターン

```ts
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
