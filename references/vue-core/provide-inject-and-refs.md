# Provide/Inject & Template Refs

**Reference: Vue Core | Senior Engineering Standards**

Two adjacent escape hatches from strict props/events: cross-tree dependency injection, and direct child/DOM access.

---

## Provide / Inject

Use only for **deep-tree dependencies** or shared context — not as a substitute for props between close components.

### Type it with `InjectionKey`

```ts
// keys.ts
import type { InjectionKey, Ref } from 'vue'
export interface ThemeContext { theme: Ref<string>; toggle: () => void }
export const themeKey: InjectionKey<ThemeContext> = Symbol('theme')
```

```ts
// provider
provide(themeKey, { theme, toggle })

// consumer — fully typed, no cast
const ctx = inject(themeKey)
```

### Rules & gotchas

- **`provide`/`inject` must run synchronously in setup** — calling `provide` after an `await` fails silently.
- **Reactivity is not automatic**: provide a `ref`/`reactive` (or a getter), not a plain snapshot, if consumers must react to changes.
- **Default value factory**: pass a factory for object defaults so instances aren't shared:
  ```ts
  inject(key, () => ({ items: [] }), true) // third arg = treat as factory
  ```
- Provided values are hard to trace — document the provider for each key.

---

## Template Refs

### Vue 3.5+: `useTemplateRef`

Refactor-safe — the string is the only coupling, and it's checked.

```vue
<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue'
const inputEl = useTemplateRef<HTMLInputElement>('input')
onMounted(() => inputEl.value?.focus())
</script>

<template><input ref="input" /></template>
```

(Pre-3.5: declare `const inputEl = ref<HTMLInputElement | null>(null)` and match the variable name to the `ref` attribute.)

### Gotchas

- A template ref is **`null` until mounted** and again after a `v-if` removes the element — always null-check.
- **DOM reads are stale** until after the update — read in `onMounted`, a `flush: 'post'` watcher, or after `nextTick()`.
- Refs collected inside `v-for` are **not guaranteed to match source order** — don't index-map blindly.

### Child component refs need `defineExpose`

A `<script setup>` child is closed by default. The parent sees nothing on the ref unless the child explicitly exposes it:

```vue
<!-- Child.vue -->
<script setup>
const reset = () => { /* ... */ }
defineExpose({ reset })
</script>
```

`defineExpose` must run **before any `await`** in async setup, or the exposed API is missing.

---

## Checklist

- [ ] Inject keys are typed `InjectionKey<T>`
- [ ] `provide`/`inject` run synchronously, before any await
- [ ] Reactive context is provided as ref/reactive, not a snapshot
- [ ] Template refs are null-checked and read post-mount
- [ ] Child APIs are surfaced via `defineExpose`

---

**Related:** `../architecture/data-flow.md` · [reactivity](reactivity.md)
