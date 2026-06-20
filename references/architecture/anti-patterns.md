# Anti-Patterns to Avoid

**Reference: Architecture | Vue 3 Senior Engineering Standards**

---

1. **Two-way binding beyond form inputs** (`v-model` on parent data)
2. **Mutating props directly** in child components
3. **Store accessed directly from templates** (use computed)
4. **Sibling-to-sibling direct communication**
5. **Storing derived/computed values** in state
6. **Excessive watchers** instead of computed properties
7. **Component-specific logic in global stores**
8. **Deep nesting** in directory structure
9. **Overly generic composables** with unclear purpose
10. **Mixing presentation and business logic** in same component

---

## Vue-Reactivity Anti-Patterns

> Full debugging catalog: `references/vue-core/reactivity.md` and `references/vue-core/ssr-hydration.md`.

- Destructuring `reactive()` objects (breaks reactivity — use `toRefs`)
- Destructuring Pinia stores without `storeToRefs`
- Mutating computed return values
- Side effects inside `computed` getters
- Mixing `v-if` with `v-for` on the same element
- Missing/unstable `:key` on `v-for`
- Forgetting `.value` outside templates

---

**Related:** [core-principles](core-principles.md) · [code-quality](code-quality.md)
