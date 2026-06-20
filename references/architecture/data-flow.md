# Data Flow Patterns

**Reference: Architecture | Vue 3 Senior Engineering Standards**

---

## Core Pattern: Props Down, Events Up

```
Parent Component
    ↓ props (data)
  Child Component
    ↑ emits (interactions)
Parent Component (handler)
```

**Rules:**
- [ ] Data flows parent → child via props
- [ ] Interactions flow child → parent via emits
- [ ] No sibling-to-sibling direct communication
- [ ] Complex flows use centralized state management
- [ ] Prop drilling avoided (max 2-3 levels; use Provide/Inject beyond)
- [ ] Props never mutated in child components
- [ ] Event handlers defined in parent components

---

## Alternative Patterns (When Needed)

### Provide/Inject (Avoid Prop Drilling)

- Use for deeply nested component trees
- Document provided values clearly
- Type-safe with TypeScript (`InjectionKey<T>`)
- Prefer explicit passing for clarity when possible

> Deep dive: `references/vue-core/provide-inject-and-refs.md`

### Composable Pattern (Shared Logic)

- Extract reusable stateful logic into composables
- Composables are functions returning reactive state
- Single-purpose, focused on one concern
- Can be used across components and stores

> Deep dive: [composables](composables.md) and `references/vue-core/adaptable-composables.md`

---

**Related:** [state-management](state-management.md) · [component-architecture](component-architecture.md)
