---
name: vue3-senior-engineering
description: |
  Generate and maintain production-grade Vue 3 code at senior engineering level, specializing in Composition API, scalable architecture, and clean code patterns. Use this skill whenever the user is writing, refactoring, or reviewing Vue 3 components, composables, Pinia stores, plugins, or application architecture. Also use for performance optimization, TypeScript enforcement, Vue-to-Nuxt conversions, and architectural guidance. This skill acts as a senior frontend architect and code reviewer, not just a code generator—it proactively identifies issues, suggests better abstractions, reduces technical debt, and promotes consistency.
---

# Vue 3 Senior Engineering Skill

Produce production-grade Vue 3 code following architectural best practices, team conventions, and senior-level engineering standards.

**This file is the entry point.** It defines *how to operate* and *where to find* detailed standards. The substance lives in single-topic files under [`references/`](references/) — **load only the file relevant to the task** rather than reading everything up front.

---

## Non-Negotiable Conventions (apply to EVERY `.vue` file)

These override any default habit or other convention. Do not produce a component that violates them. Full rules + worked example: [`references/architecture/sfc-structure.md`](references/architecture/sfc-structure.md).

1. **Block order is `<template>` → `<script setup lang="ts">` → `<style>`.** Template comes FIRST. Never script-first.
2. **Organize the script by logical concern, NOT by API type.** Do **not** create `// State` / `// Computed` / `// Methods` sections. Instead, each feature concern owns its state + computed + watchers + lifecycle + methods together, under a single uppercase comment header (e.g. `// SEARCH`, `// USER DATA`, `// SELECTION`). Order within the script: imports → contract (`defineProps`/`defineEmits`/`defineModel`) → concern blocks.

```vue
<template> … </template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<Props>()        // contract (no header)

// USER DATA — fetch + loading/error state
const users = ref<User[]>([]); const isLoading = ref(false)
const fetchUsers = async () => { /* … */ }
onMounted(fetchUsers)

// SEARCH — filter the list
const query = ref('')
const filtered = computed(() => users.value.filter(u => u.name.includes(query.value)))
</script>
```

❌ Wrong: `<script>` before `<template>`; or `// Computed Properties` / `// Event Handlers` type-banners.
✅ Right: template first; concern headers grouping all related code.

---

## Core Operating Principles

1. **Plan before code** — clarify requirements and propose a plan first (see [Workflow](#workflow-plan-before-code)).
2. **Production-grade first** — optimized, structured, test-ready from day one.
3. **Composition API + `<script setup lang="ts">` always** — Options API only for explicit legacy work.
4. **Type safety enforced** — strict TypeScript, no `any`, explicit return types.
5. **Separation of concerns** — clear UI / business-logic / data-access boundaries.
6. **Senior-level collaboration** — ask clarifying questions, offer alternatives with rationale, flag tech debt proactively.
7. **Performance conscious** — but optimize *after* behavior is correct, not before.
8. **Consistency** — enforce the naming, structure, and patterns documented in `references/`.

---

## When to Use This Skill

Writing or refactoring **components, composables, Pinia stores, or plugins**; **Options API → Composition API** conversions; **frontend architecture** discussions (structure, data flow, patterns); **performance** work; **HTTP/API** layers; **Nuxt** setup (SSR, auto-imports, middleware); **Zod** validation; **Tailwind** configuration; **code review** of Vue code; and **debugging** Vue-specific issues (reactivity, lifecycle, hydration, watchers).

Accepts `.vue`/`.ts` files, store/plugin files, feature or UI requirements, refactor requests, bug reports, perf concerns, code snippets, and config files (Tailwind, Vite, Nuxt).

---

## Workflow: Plan Before Code

**Never jump straight to code generation.** First clarify:

1. What is the feature/task, and what problem does it solve?
2. What's the current state (existing code, architecture, constraints)?
3. Are there existing patterns in the codebase / team standards?
4. Scale (single component, feature, refactor, architecture)?
5. Constraints (performance, accessibility, compatibility, security)?
6. Integration points (API, stores, routing, other components)?

Then propose a short plan — **Overview · Structure · Key Decisions · Implementation Steps · Open Questions** — and confirm:
> "Does this plan align with what you need? Any changes before we implement?"

---

## Reference Library

### `references/architecture/` — engineering standards · [index](references/architecture/README.md)

| File | Load when |
|------|-----------|
| [core-principles](references/architecture/core-principles.md) | Foundational design rules (SRP, SoC, data-flow tenets) |
| [component-architecture](references/architecture/component-architecture.md) | Component types (base/container/layout/presentational), design checklist, size rules |
| [sfc-structure](references/architecture/sfc-structure.md) | **Mandatory SFC layout** — block order `template → script → style`, concern-grouped script |
| [state-management](references/architecture/state-management.md) | Where state lives (UI/app/server/derived); Pinia structure & checklist |
| [data-flow](references/architecture/data-flow.md) | Props down/events up, provide/inject, composable patterns |
| [code-organization](references/architecture/code-organization.md) | Folder structure, naming conventions, file-org checklist |
| [performance](references/architecture/performance.md) | Render/reactivity/store/bundle/list optimizations (post-functionality pass) |
| [testing](references/architecture/testing.md) | Coverage strategy + unit/integration/E2E best practices |
| [composables](references/architecture/composables.md) | Designing reusable stateful logic |
| [code-quality](references/architecture/code-quality.md) | TypeScript, Prettier, comments, JSDoc, review checklist |
| [architecture-decision-records](references/architecture/architecture-decision-records.md) | Writing ADRs (with template) |
| [anti-patterns](references/architecture/anti-patterns.md) | What to avoid |

### `references/tooling/` — team conventions · [index](references/tooling/README.md)

| File | Load when |
|------|-----------|
| [testing-stack](references/tooling/testing-stack.md) | Vitest + Vue Test Utils setup, factories, worked component/composable/store tests |
| [http-api](references/tooling/http-api.md) | Fetch client, request/response transforms, plugin injection, service layer |
| [validation-error-handling](references/tooling/validation-error-handling.md) | Zod schemas; error-logging conventions |
| [date-utilities](references/tooling/date-utilities.md) | day.js; one-function-per-file utilities |
| [styling](references/tooling/styling.md) | Tailwind v4, utility composition, responsive, dark mode, dynamic-class gotcha |
| [build-environment](references/tooling/build-environment.md) | Vite config, aliases, env vars |
| [nuxt-patterns](references/tooling/nuxt-patterns.md) | Nuxt 3 structure, auto-imports, server/client boundaries, data fetching, server routes |

### `references/vue-core/` — Vue runtime deep-dives · [index](references/vue-core/README.md)

| File | Load when |
|------|-----------|
| [reactivity](references/vue-core/reactivity.md) | `ref` vs `reactive`, computed/watch/watchEffect, flush timing, stale-async guards, shallowRef/markRaw |
| [adaptable-composables](references/vue-core/adaptable-composables.md) | Library-grade composables: `MaybeRef`/getters, `toValue`/`toRef` |
| [builtin-components](references/vue-core/builtin-components.md) | Teleport, Suspense, KeepAlive, Transition/TransitionGroup + gotchas |
| [provide-inject-and-refs](references/vue-core/provide-inject-and-refs.md) | Typed `InjectionKey`, reactive injection, template refs, `useTemplateRef`, `defineExpose` |
| [ssr-hydration](references/vue-core/ssr-hydration.md) | Hydration mismatches, browser-only APIs, cross-request state pollution |

### `references/routing/` — Vue Router

| File | Load when |
|------|-----------|
| [vue-router](references/routing/vue-router.md) | Navigation guards, param-change lifecycle, redirect-loop & async-guard gotchas |

### `references/examples/` — runnable code · [index](references/examples/README.md)

`BaseComponent.vue` · `PresentationalComponent.vue` · `FeatureComponent.vue` · `ProductStore.ts` · `useFetchProducts.ts` · `useDocumentTitle.ts` — all `.vue` examples follow the [SFC structure](references/architecture/sfc-structure.md) conventions.

### Routing rule of thumb

- **Writing a component** → `architecture/component-architecture` + `architecture/sfc-structure` + `vue-core/reactivity`
- **Building a composable** → `architecture/composables` + `vue-core/adaptable-composables`
- **State/stores** → `architecture/state-management` (+ `vue-core/reactivity`)
- **Debugging reactivity / SSR** → `vue-core/reactivity` + `vue-core/ssr-hydration`
- **Routing** → `routing/vue-router`
- **Tooling/setup** (tests, HTTP, styling, Vite, Nuxt) → the relevant `tooling/` file

> The `vue-core/` and `routing/` deep-dives are informed by the community [vuejs-ai/skills](https://github.com/vuejs-ai/skills) collection (MIT), distilled into this skill's voice. That repo's `vue-debug-guides` is a strong companion for an exhaustive per-error index.

---

## Additional Resources

[Vue 3](https://vuejs.org/guide/) · [Pinia](https://pinia.vuejs.org/) · [Vue Router](https://router.vuejs.org/) · [Tailwind CSS v4](https://tailwindcss.com/) · [Vitest](https://vitest.dev/) · [Vue Test Utils](https://test-utils.vuejs.org/) · [Nuxt 3](https://nuxt.com/docs) · [Zod](https://zod.dev/) · [day.js](https://day.js.org/) · [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
