---
name: new-component
description: Remix Component モデルで共有 UI コンポーネントを作成する
user-invocable: true
allowed-tools: Read, Write, Glob
---

# new-component スキル

`$ARGUMENTS` の形式: `<ComponentName>`
例: `/new-component ArticleCard`

## 手順

1. **`app/ui/<kebab-case名>.tsx` を作成する**

   基本テンプレート（状態なし）:
   ```tsx
   // app/ui/article-card.tsx
   import type { Handle } from 'remix/component'

   interface ArticleCardProps {
     title: string
     publishedAt: string
     href: string
   }

   export function ArticleCard(_handle: Handle, _setup: undefined) {
     return (props: ArticleCardProps) => (
       <a href={props.href}>
         <h2>{props.title}</h2>
         <time>{props.publishedAt}</time>
       </a>
     )
   }
   ```

   状態あり（インタラクティブ）:
   ```tsx
   export function TogglePanel(_handle: Handle) {
     // setup フェーズ: 一度だけ実行
     let open = false

     // render 関数: 更新のたびに実行
     return (props: { label: string; children: unknown }) => (
       <div>
         <button mix={[on('click', () => { open = !open; _handle.update() })]}>
           {props.label}
         </button>
         {open && <div>{props.children}</div>}
       </div>
     )
   }
   ```

2. **規約を守る**
   - 二段階構成（setup → render 関数を返す）を守る
   - 状態は setup スコープのプレーンな変数で管理
   - データ取得はしない（props で受け取る）
   - ルート固有の UI は `app/ui/` ではなくコントローラーと同居させる

3. **確認する**
   - 作成したファイルパスをユーザーに報告する
