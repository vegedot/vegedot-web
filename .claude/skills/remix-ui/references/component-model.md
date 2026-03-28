# Component Model

Components follow a two-phase shape: setup runs once, the returned render function runs on every
update.

```tsx
function Counter(handle: Handle, setup: number) {
  // Setup phase — runs once per instance
  let count = setup

  // Render function — runs on initial render and every update
  return (props: { label?: string }) => (
    <div>
      {props.label ?? 'Count'}: {count}
      <button
        mix={[
          on('click', () => {
            count++
            handle.update()
          }),
        ]}
      >
        Increment
      </button>
    </div>
  )
}
```

## State

- Keep state as plain JavaScript variables in the setup scope.
- Store only values that affect rendering.
- Calculate derived values in the render phase, not in setup.
- Do not duplicate input state unless you explicitly need controlled behavior.
- Reserve setup for one-time initialization.

## Handle API

- `handle.update()` — schedules a rerender; can be awaited to wait for the DOM to reflect the
  update before doing more work.
- `handle.queueTask(task)` — runs after render; use for DOM work, reactive data loading, focus
  management, or measurements.
- `handle.signal` — aborted when the component disconnects; pass to async work for cleanup.
- `handle.id` — stable identifier per instance.
- `handle.context` — communicate with ancestor or descendant components.
- `handle.frame` / `handle.frames` — frame-aware work in client entries.

## Global Event Listeners

For window-level or document-level events, use `addEventListeners` with the handle signal for
cleanup:

```tsx
import { addEventListeners } from 'remix/component'

function KeyLogger(handle: Handle) {
  let keys: string[] = []

  addEventListeners(document, handle.signal, {
    keydown: (event) => {
      keys.push(event.key)
      handle.update()
    },
  })

  return () => <pre>{keys.join(', ')}</pre>
}
```
