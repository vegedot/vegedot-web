# Mixins, Styling, and Events

Use mixins via the `mix` prop on host elements. Import from `remix/component`.

```tsx
import { on, css, ref, link, pressEvents, keysEvents } from 'remix/component'
```

## Events — `on(...)`

```tsx
<button mix={[on('click', () => { count++; handle.update() })]}>
  Click me
</button>
```

Handlers may receive `signal`. Pass `signal` to async work when possible:

```tsx
<button mix={[on('click', async (event, signal) => {
  const data = await fetch('/api', { signal })
  result = await data.json()
  handle.update()
})]}>
  Load
</button>
```

## DOM Access — `ref(...)`

```tsx
<input mix={[ref((node) => node.focus())]} />
```

## Styling — `css(...)`

Prefer `css(...)` for static stylesheet-like rules. Use `style` for frequently changing values.

```tsx
<div
  mix={[css({
    color: 'white',
    backgroundColor: 'blue',
    '&:hover': { backgroundColor: 'darkblue' },
    '@media (max-width: 768px)': { padding: '8px' },
  })]}
/>
```

Dynamic values → use `style` directly:

```tsx
<div style={{ opacity: isVisible ? 1 : 0 }} />
```

## Navigation — `link(...)`

```tsx
<a mix={[link('/articles', { prefetch: true })]}>Articles</a>
```

## Input Helpers

```tsx
<div mix={[keysEvents({ Enter: () => submit() })]}>...</div>
<button mix={[pressEvents({ onPress: () => action() })]}>...</button>
```

## Animations

```tsx
import { animateEntrance, animateExit, animateLayout } from 'remix/component'

<div mix={[animateEntrance({ opacity: [0, 1] })]}>...</div>
<div mix={[animateExit({ opacity: [1, 0] })]}>...</div>
<div mix={[animateLayout()]}>...</div>
```
