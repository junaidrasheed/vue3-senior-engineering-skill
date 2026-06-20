# SSR & Hydration

**Reference: Vue Core | Senior Engineering Standards**

When code renders on the server and hydrates on the client (Nuxt, vite-ssr), the server and client HTML **must match**, and per-request state must not leak. These are the failure modes seniors are expected to prevent.

---

## Hydration mismatches

Hydration fails when the client's first render differs from the server HTML. Common causes:

- **Non-deterministic values** at render time: `Date.now()`, `Math.random()`, locale-dependent formatting.
- **Browser-only APIs** read during render: `window`, `localStorage`, `navigator`.
- **Invalid HTML nesting** the browser auto-corrects (e.g. `<div>` inside `<p>`).
- **Conditional rendering on client-only signals** during the initial render.

```ts
// ✗ Renders different markup on server vs client
const now = new Date().toLocaleString()

// ✓ Defer client-only values until mounted
const now = ref('')
onMounted(() => { now.value = new Date().toLocaleString() })
```

For inherently client-only UI, gate it: Nuxt `<ClientOnly>`, a `.client.vue` component, or an `onMounted` flag.

---

## Browser-only APIs in universal code

Any module that runs on the server must not touch `window`/`document` at top level or during setup. Guard or defer:

```ts
if (import.meta.client) { /* browser-only */ }
// or
onMounted(() => { /* safe: client only */ })
```

---

## Cross-request state pollution

On the server the app is long-lived across requests. **Module-level singletons leak one user's data into another's request.**

- Pinia: Nuxt creates a fresh Pinia per request — never instantiate a store at module scope or cache user data in a module-level variable.
- Composables: don't hold request-specific state in module-level refs; create state inside the composable call.

```ts
// ✗ Shared across ALL server requests
const user = ref(null)
export const useUser = () => ({ user })

// ✓ Fresh state per call
export const useUser = () => {
  const user = ref(null)
  return { user }
}
```

---

## Teleport & Suspense under SSR

- Teleported content can mismatch on hydration — teleport to a stable, server-rendered node.
- Suspense + SSR has hydration subtleties; verify server output equals the resolved client tree.

---

## Checklist

- [ ] No `Date.now()`/`Math.random()`/locale formatting in render path
- [ ] Browser APIs guarded (`import.meta.client`) or deferred to `onMounted`
- [ ] No module-level singletons holding per-request/user state
- [ ] Client-only UI wrapped (`<ClientOnly>` / `.client.vue` / mounted flag)
- [ ] Valid HTML nesting

---

**Related:** `../tooling/nuxt-patterns.md` · [reactivity](reactivity.md) · [builtin-components](builtin-components.md)
