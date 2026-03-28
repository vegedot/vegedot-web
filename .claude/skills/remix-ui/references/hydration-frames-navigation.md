# Hydration, Frames, and Navigation

## Client Entries — `clientEntry` + `run`

Mark interactive islands with `clientEntry(...)`:

```tsx
// app/controllers/home.tsx
export let HomeIsland = clientEntry(function(handle: Handle) {
  let count = 0
  return () => (
    <button mix={[on('click', () => { count++; handle.update() })]}>
      {count}
    </button>
  )
})
```

Activate in the browser via `run(...)`:

```ts
// app/assets/client.ts
import { run } from 'remix/component'

run({
  loadModule: (moduleUrl, exportName) => import(moduleUrl).then(m => m[exportName]),
  resolveFrame: async (src, signal, target) => {
    const res = await fetch(src, { signal })
    return res.text()
  },
})
```

`app.ready()` waits for initial hydration before proceeding.

## Frames

Frames are server-rendered regions that load or reload independently:

```html
<div rmx-src="/partial/content" rmx-target="self"></div>
```

`resolveFrame` receives `currentFrameSrc` and `topFrameSrc` for nested frame context.

## Navigation

- Prefer real `<a>` tags for normal document navigation.
- Use `link()` mixin for prefetching:
  ```tsx
  <a mix={[link('/page', { prefetch: true })]}>Page</a>
  ```
- Programmatic navigation: `navigate(href, options)`

## Head Management

Keep `<head>` explicit in document/layout components. The framework renders it as part of the UI
tree and updates it intentionally during navigation.

```tsx
function Document(handle: Handle) {
  return (props: { title: string; children: ReactNode }) => (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </head>
      <body>{props.children}</body>
    </html>
  )
}
```
