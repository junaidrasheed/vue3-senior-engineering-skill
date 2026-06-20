# Adaptable Composables

**Reference: Vue Core | Senior Engineering Standards**

Library-grade composables accept **maybe-reactive** inputs so callers can pass a plain value, a `ref`, or a getter — without caring about the composable's internals.

---

## The input types

```ts
import type { MaybeRef, MaybeRefOrGetter } from 'vue'

// MaybeRef<T>          = T | Ref<T> | ShallowRef<T> | WritableComputedRef<T>
// MaybeRefOrGetter<T>  = MaybeRef<T> | ComputedRef<T> | (() => T)
```

### Which to use

| Need | Type |
|------|------|
| Read-only, computed-friendly input | `MaybeRefOrGetter<T>` |
| Writable / two-way input | `MaybeRef<T>` |
| Param might itself be a function (callback/predicate/comparator) | **Plain type** — `MaybeRefOrGetter` would invoke it as a getter |
| DOM/element target, possibly derived | `MaybeRefOrGetter<T>` |

---

## Normalize inside reactive effects

- Resolve a **reactive source** (e.g. a watcher source) with `toRef()`.
- Resolve a **plain current value** with `toValue()`.

```ts
import { watch, toRef } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

// Read-only input
export function useDocumentTitle(title: MaybeRefOrGetter<string>) {
  watch(toRef(title), (t) => { document.title = t }, { immediate: true })
}
```

```ts
import { toRef } from 'vue'
import type { MaybeRef } from 'vue'

// Two-way writable input
export function useCounter(count: MaybeRef<number>) {
  const countRef = toRef(count)
  const add = () => { countRef.value++ }
  return { add }
}
```

```ts
import { toValue, watchEffect } from 'vue'

// toValue() inside an effect re-tracks the dependency on every run
export function useFetch(url: MaybeRefOrGetter<string>) {
  const data = ref(null)
  watchEffect(async () => {
    const res = await fetch(toValue(url)) // re-runs when url ref/getter changes
    data.value = await res.json()
  })
  return { data }
}
```

---

## Return-shape conventions

- Return refs (not reactive objects) so callers can destructure without losing reactivity.
- Group returns: state → computed → methods.
- Register cleanup with `onScopeDispose` (works outside component setup too) for listeners/timers.
- Keep the API small and typed; no hidden mutation of caller-owned state.

---

**Example:** `../examples/useDocumentTitle.ts`

**Related:** [reactivity](reactivity.md) · `../architecture/composables.md` · `../architecture/sfc-structure.md`
