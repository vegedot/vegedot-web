# React Router v7 ルール

## データ取得パターン

**必須**: データ取得は必ずサーバーサイドの `loader` で行う。

```typescript
// ✅ 正しい: loader でサーバーサイド取得
export async function loader({ params }: Route.LoaderArgs): Promise<{ article: Article }> {
  const article = await microcms.getListDetail<Article>({
    endpoint: 'articles',
    contentId: params.id,
  })
  return { article }
}

export default function Page({ loaderData }: Route.ComponentProps): React.ReactElement {
  const { article } = loaderData
  // ...
}

// ❌ 禁止: useEffect + fetch によるクライアント取得
useEffect(() => { fetch('/api/...') }, [])
```

## ルーティング記法（remix-flat-routes）

| ファイルパス | URL |
|---|---|
| `_public+/_layout.tsx` | レイアウト（URL なし）|
| `_public+/index.tsx` | `/` |
| `_public+/articles.$id.tsx` | `/articles/:id` |
| `_public+/$.tsx` | 404（キャッチオール）|

## 型インポート

生成された型は相対パスで参照する:

```typescript
import type { Route } from './+types/index'
```

## `.server.ts` ファイル

`microcms.server.ts` のように `.server.ts` 拡張子を付けると、React Router がクライアントバンドルから自動除外する。
サーバー専用処理（DB アクセス、API 認証情報の使用等）はこの命名規則に従う。
