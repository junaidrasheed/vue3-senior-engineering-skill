# Built-in Components

**Reference: Vue Core | Senior Engineering Standards**

`<Teleport>`, `<Suspense>`, `<KeepAlive>`, `<Transition>`, `<TransitionGroup>`. Reach for these only when the requirement exists — don't add by default.

---

## `<Teleport>` — overlays & portals

Render content elsewhere in the DOM (modals, toasts) while keeping it logically in the component.

```vue
<Teleport to="body">
  <div class="modal">...</div>
</Teleport>
```

**Gotchas:**
- The target **must exist** when Teleport mounts. For a target rendered by Vue itself, use `:disabled` until it's ready, or teleport to `body`.
- **Scoped styles do not reach teleported content** — it lives outside the component's DOM subtree. Use global styles or a CSS module.
- **SSR**: teleported content can cause hydration mismatches; teleport to a stable existing node.

---

## `<Suspense>` — async subtree fallback

Shows a fallback while async setup / async components resolve.

```vue
<Suspense>
  <UserDashboard />
  <template #fallback>Loading…</template>
</Suspense>
```

**Gotchas:**
- **No built-in error handling.** Pair with an error boundary (`onErrorCaptured`) — Suspense only handles the pending state.
- An async component's own `loadingComponent`/`errorComponent` are **ignored** when it's under Suspense; Suspense controls the loading UI.
- SSR + Suspense has hydration subtleties — verify server/client output matches.

---

## `<KeepAlive>` — cache component state

Preserves state of toggled components (tabs, wizards).

```vue
<KeepAlive :max="10">
  <component :is="currentTab" />
</KeepAlive>
```

**Gotchas:**
- With nested Vue Router routes, careless wrapping causes **double-mounting**.
- `KeepAlive` + `Transition` together can **leak memory**; cap with `:max` and test.
- Use `onActivated` / `onDeactivated` instead of mount/unmount hooks for cached components.

---

## `<Transition>` & `<TransitionGroup>`

`<Transition>` animates a single element's enter/leave; `<TransitionGroup>` animates list mutations.

```vue
<Transition name="fade"><p v-if="show">Hi</p></Transition>

<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item.id">{{ item.label }}</li>
</TransitionGroup>
```

**Gotchas:**
- A stable, unique `:key` is **required** for move/FLIP animations.
- JS transition hooks must call the `done` callback or the transition hangs.
- `TransitionGroup` no longer renders a wrapper by default in Vue 3 — set `tag` if you need one.
- Move animations don't work on `display: inline` elements; use `inline-block`/`block`.

> Prefer the simplest approach that meets the motion requirement — class-based or state-driven animation is often enough without these components.

---

**Related:** [ssr-hydration](ssr-hydration.md) · `../architecture/performance.md`
