# Testing Patterns

Use `createRoot(...)` and `root.flush()` for component tests.

```ts
import { createRoot } from 'remix/component/testing'

test('counter increments', async () => {
  let root = createRoot(<Counter setup={0} />)
  await root.flush()  // flush after initial render

  let button = root.container.querySelector('button')!
  button.click()
  await root.flush()  // flush after interaction

  assert.equal(root.container.textContent, 'Count: 1')
})
```

## Key Flush Scenarios

1. After the initial render
2. After interactions that trigger `handle.update()`
3. When async work completes via `queueTask(...)`
4. Use `root.dispose()` to test cleanup behavior

## Recommended Practices

- Keep component state minimal.
- Prioritize testing event handler logic.
- Use `queueTask` for post-render operations.
- Use `TypedEventTarget` for subscriptions.
- Test with real DOM interactions rather than mocking framework internals.
- One representative navigation test is enough — don't repeat the pattern.

## What to Avoid

- Don't over-rely on implementation details for test synchronization.
- Don't mock framework functionality that real DOM interactions can validate.
- Don't write redundant navigation assertions.
