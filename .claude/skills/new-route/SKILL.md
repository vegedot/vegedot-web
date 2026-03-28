---
name: new-route
description: Remix v3 の新しいルートを追加する（routes.ts への追記 + コントローラーファイル作成）
user-invocable: true
allowed-tools: Read, Write, Edit, Glob, Bash
---

# new-route スキル

`$ARGUMENTS` の形式: `<ルートキー> <URLパターン> [--controller]`

例:
- `/new-route articles.show /articles/:id` → フラットファイル
- `/new-route auth.login /auth/login --controller` → コントローラーフォルダ

## 手順

1. **`app/routes.ts` を読んで既存のルートを確認する**

2. **`app/routes.ts` にルートを追記する**

   ```ts
   export const routes = route({
     // 既存のルート...
     articles: {
       index: '/articles',
       show: '/articles/:id',   // ← 追記
     },
   })
   ```

3. **コントローラーファイルを作成する**

   フラットルート（シンプルなページ）:
   ```tsx
   // app/controllers/articles/show.tsx
   import type { Context } from 'remix/fetch-router'
   import { microcms } from '../../data/microcms.ts'
   import type { Article } from '../../data/types.ts'

   export async function handler({ params }: Context): Promise<Response> {
     const article = await microcms.getListDetail<Article>({
       endpoint: 'articles',
       contentId: params.id,
     })
     return renderHTML(<ShowPage article={article} />)
   }

   function ShowPage({ article }: { article: Article }) {
     return (handle: Handle) => (
       <article>
         <h1>{article.title}</h1>
       </article>
     )
   }
   ```

   コントローラーフォルダ（`--controller` 指定時）:
   - `app/controllers/<name>/controller.tsx` に作成
   - ネストは `app/routes.ts` の構造をミラーリング

4. **`app/router.ts` にハンドラを登録する**

   ```ts
   import { handler as articlesShowHandler } from './controllers/articles/show.tsx'

   router.get(routes.articles.show, articlesShowHandler)
   ```

5. **確認する**
   - `npm run typecheck` を実行
   - 作成したファイルをユーザーに報告する
