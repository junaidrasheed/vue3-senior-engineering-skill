# Reactivity Deep-Dive

**Reference: Vue Core | Senior Engineering Standards**

The reactivity model is the single biggest source of subtle bugs in Vue 3 codebases. Keep source state minimal and derive everything else.

---

## `ref` vs `reactive` — pick `ref` by default

- **`ref`** wraps any value (primitive or object). Access with `.value` in script; auto-unwrapped in templates. Reassignable (`x.value = newObj`).
- **`reactive`** only wraps objects, cannot hold primitives, and **cannot be reassigned or destructured** without losing reactivity.

**Default to `ref`.** It is consistent, reassignable, and survives destructuring via `toRefs`.

```ts
// ✗ Destructuring reactive() breaks reactivity
const state = reactive({ count: 0 })
const { count } = state // count is now a plain, disconnected number

// ✓ ref, or toRefs if you must destructure a reactive object
const count = ref(0)
const { count: c } = toRefs(state) // c stays reactive
```

---

## Derive, don't store

Keep one source of truth and compute the rest. Never store a value you can derive.

```ts
const items = ref<Item[]>([])
// ✓ derived
const total = computed(() => items.value.reduce((s, i) => s + i.price, 0))
```

### `computed` rules

- **No side effects** in a getter (no mutations, no requests) — getters must be pure.
- The **return value is read-only**; mutating it does nothing (or warns). Use a writable computed (`get`/`set`) for two-way needs.
- **No parameters** — a computed is a value, not a function. Need parameters? Return a function, or use a `computed` keyed by a `ref`.
- **Don't mutate source arrays** in a getter — `.sort()`/`.reverse()` mutate in place. Copy first: `[...items.value].sort(...)`.
- Conditional dependencies must be **read every run** or they won't be tracked.

---

## `watch` vs `watchEffect`

- Use **`computed`** for derived values (most cases).
- Use **`watch`** for side effects that respond to specific sources — gives you old & new values, lazy by default.
- Use **`watchEffect`** when the effect's dependencies are implicit; runs immediately and re-tracks each run. **Dependencies read after an `await` are NOT tracked** — read them synchronously first.

```ts
// ✗ id read after await — not tracked
watchEffect(async () => {
  await delay()
  console.log(id.value)
})

// ✓ read synchronously, then await
watchEffect(async () => {
  const current = id.value
  await delay()
  console.log(current)
})
```

### Async watchers: guard against stale results

```ts
watch(query, async (q, _old, onCleanup) => {
  let cancelled = false
  onCleanup(() => { cancelled = true })
  const res = await search(q)
  if (!cancelled) results.value = res // ignore out-of-order responses
})
```

### Flush timing

- Default (`pre`): runs before DOM update — DOM reads are **stale**.
- `flush: 'post'`: runs after DOM update — use when reading the DOM / template refs.
- Or use `nextTick()` for one-off post-update DOM reads.

---

## Performance & escape hatches

- **`shallowRef` / `shallowReactive`**: only the top level is reactive. Use for large/immutable data structures you replace wholesale.
- **`markRaw`**: opt an object out of reactivity entirely. Use for third-party class instances (chart libs, maps, editors) that break when proxied.
- **Proxy identity hazard**: `reactive(obj) !== obj`. Don't compare a proxy to its raw target; use `toRaw()` if you must.

---

## Quick checklist

- [ ] Source state minimal; everything derivable is a `computed`
- [ ] No side effects inside computed getters
- [ ] No destructuring of `reactive()` without `toRefs`
- [ ] Async watchers guard against stale/out-of-order results
- [ ] DOM-reading effects use `flush: 'post'` or `nextTick`
- [ ] Large/foreign objects use `shallowRef` / `markRaw`

---

**Related:** [adaptable-composables](adaptable-composables.md) · `../architecture/performance.md` · [ssr-hydration](ssr-hydration.md)
