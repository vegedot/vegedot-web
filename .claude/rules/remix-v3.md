# Remix v3 ルール

## コンポーネントモデル（React ではない）

Remix v3 は独自の二段階コンポーネントモデルを使う。

```tsx
import { Handle } from 'remix/component'

function Counter(handle: Handle, setup: number) {
  // setup フェーズ: 初回のみ実行
  let count = setup

  // render 関数: 更新のたびに実行
  return (props: { label?: string }) => (
    <div>
      {props.label ?? 'Count'}: {count}
      <button
        mix={[on('click', () => {
          count++
          handle.update()
        })]}
      >
        +1
      </button>
    </div>
  )
}
```

### 状態管理

- `useState` 等のフック禁止
- setup スコープのプレーンな変数で状態を持つ
- 更新は `handle.update()` を明示的に呼ぶ

### ミックスインで DOM 操作

```tsx
mix={[on('click', handler)]}          // イベント
mix={[css({ color: 'red' })]}         // スタイル
mix={[ref((el) => { ... })]}          // DOM 参照
mix={[link('/path', { prefetch: true })]} // リンク
```

グローバルリスナーは `addEventListeners(target, handle.signal, { ... })`

## ルーティング（fetch-router）

```ts
// app/routes.ts
import { route } from 'remix/fetch-router/routes'

export const routes = route({
  home: '/',
  about: '/about',
  articles: {
    index: '/articles',
    show: '/articles/:id',
  },
})
```

```ts
// app/router.ts
import { createRouter } from 'remix/fetch-router'
import { routes } from './routes.ts'

const router = createRouter()

router.get(routes.home, () => new Response('Home'))

router.get(routes.articles.show, async ({ params }) => {
  // サーバーサイド処理
})

export { router }
```

## ファイル配置ルール

| コード種別 | 配置先 |
|---|---|
| ルートハンドラ + ルート固有 UI | `app/controllers/` |
| 共有コンポーネント | `app/ui/` |
| microCMS クライアント・クエリ | `app/data/` |
| 認証・セッション等 | `app/middleware/` |
| クロスレイヤーヘルパー | `app/utils/` |

**禁止**: `app/lib/`・`app/components/` 等の汎用バケツを作らない。

## フラットルート vs コントローラーフォルダ

```
# シンプルなルート → フラットファイル
app/controllers/home.tsx
app/controllers/about.tsx

# ネストや複数アクション → フォルダ
app/controllers/auth/controller.tsx
app/controllers/auth/login/controller.tsx
```
