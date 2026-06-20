# Vue Router

**Reference: Routing | Senior Engineering Standards**

Vue Router 4 for production SPAs. Covers guards, param-change lifecycle, and the gotchas that cause stale data and redirect loops.

---

## Navigation Guards

Prefer returning a value (route location, `false`, or nothing) over the deprecated `next()` callback.

```ts
// ✓ Modern: return a value
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  // return nothing → allow
})
```

### Avoid infinite redirect loops

Guard the redirect target itself, or you bounce forever:

```ts
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!auth.isAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  }
})
```

### Async guards: always `await`

A guard that fires async work without awaiting resolves before the work finishes, letting navigation through prematurely.

```ts
router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const ok = await verifySession() // ✓ awaited
    if (!ok) return { name: 'login' }
  }
})
```

### `beforeRouteEnter` has no `this`

The component instance does not exist yet. Use the callback form if you need it:

```ts
beforeRouteEnter((to, from, next) => {
  next((vm) => {
    // vm is the component instance
  })
})
```

---

## Param changes do NOT re-run setup / lifecycle

Navigating `/users/1` → `/users/2` reuses the same component instance. `onMounted` and `setup()` do **not** run again — stale data is the classic symptom.

```ts
// ✓ React to param changes explicitly
const route = useRoute()
watch(
  () => route.params.id,
  (id) => fetchUser(id),
  { immediate: true }
)
```

`beforeEnter` on a route also won't trigger on a same-route param change — use `beforeRouteUpdate` or the watcher above.

---

## Cleanup on navigation

Listeners/timers added in a component must be removed (`onUnmounted` / `onScopeDispose`) or they persist after the user navigates away.

---

## Lazy-load route components

```ts
const routes = [
  { path: '/products', component: () => import('@/pages/Products.vue') },
]
```

---

## Checklist

- [ ] Guards return values, not deprecated `next()`
- [ ] Redirect targets are excluded from their own guard (no loops)
- [ ] Async guards are awaited
- [ ] Param-only navigations handled via `watch(route.params...)` / `beforeRouteUpdate`
- [ ] Route components are lazy-loaded
- [ ] Side effects cleaned up on unmount

---

**Related:** `../tooling/nuxt-patterns.md` · `../vue-core/ssr-hydration.md`
