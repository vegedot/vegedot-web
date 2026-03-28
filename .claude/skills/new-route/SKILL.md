---
name: new-route
description: React Router v7 の新しいルートファイルと対応コンポーネントを作成する
user-invocable: true
allowed-tools: Read, Write, Glob, Grep, Bash
---

# new-route スキル

`$ARGUMENTS` の形式: `<ルートパス> [エンドポイント名]`
例: `/new-route articles.$id articles` または `/new-route about`

## 手順

1. **引数を解析する**
   - 第1引数: ルートパス（例: `articles.$id`）
   - 第2引数（省略可）: microCMS エンドポイント名

2. **ルートファイルを作成する** → `app/routes/_public+/<ルートパス>.tsx`

   microCMS エンドポイントが指定された場合は loader を含む:
   ```typescript
   import type { Route } from './+types/<ルートパス>'
   import { microcms } from '~/lib/microcms.server'
   import type { Article } from '~/lib/microcms.server'

   export function meta(_: Route.MetaArgs): Route.MetaDescriptors {
     return [{ title: '<タイトル>' }]
   }

   export async function loader({ params }: Route.LoaderArgs): Promise<{ data: Article }> {
     const data = await microcms.getListDetail<Article>({
       endpoint: '<エンドポイント>',
       contentId: params.id,
     })
     return { data }
   }

   export default function Page({ loaderData }: Route.ComponentProps): React.ReactElement {
     return <div>{/* TODO */}</div>
   }
   ```

   CMS なしの静的ページの場合:
   ```typescript
   import type { Route } from './+types/<ルートパス>'

   export function meta(_: Route.MetaArgs): Route.MetaDescriptors {
     return [{ title: '<タイトル>' }]
   }

   export default function Page(_: Route.ComponentProps): React.ReactElement {
     return <div>{/* TODO */}</div>
   }
   ```

3. **確認する**
   - `pnpm typecheck` を実行してエラーがないか確認
   - 作成したファイルのパスをユーザーに報告する
