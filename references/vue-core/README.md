# Vue Core Reference

Vue 3 runtime deep-dives — the reactivity, component, and rendering mechanics that cause the most subtle bugs. Load the specific file when the task touches that area.

| File | Use when |
|------|----------|
| [reactivity](reactivity.md) | `ref` vs `reactive`, computed/watch/watchEffect, flush timing, shallowRef/markRaw, stale-async guards |
| [adaptable-composables](adaptable-composables.md) | Library-grade composables accepting `MaybeRef`/getters; `toValue`/`toRef` normalization |
| [builtin-components](builtin-components.md) | Teleport, Suspense, KeepAlive, Transition/TransitionGroup + their gotchas |
| [provide-inject-and-refs](provide-inject-and-refs.md) | Typed `InjectionKey`, reactive injection, template refs, `useTemplateRef`, `defineExpose` |
| [ssr-hydration](ssr-hydration.md) | Hydration mismatches, browser-only APIs, cross-request state pollution |

> Routing lives in `../routing/`. Architecture standards in `../architecture/`. Team tooling in `../tooling/`.
>
> **Acknowledgement:** the gotcha catalogs here are informed by the community [vuejs-ai/skills](https://github.com/vuejs-ai/skills) collection (MIT), distilled into this skill's opinionated, team-convention voice. For an exhaustive per-error debugging index, that repo's `vue-debug-guides` skill is an excellent companion.
