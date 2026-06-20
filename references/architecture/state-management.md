# State Management

**Reference: Architecture | Vue 3 Senior Engineering Standards**

---

## State Categorization

| State Type | Location | Management | Persistence | Examples |
|-----------|----------|-----------|-------------|----------|
| **UI State** | Component | Local `ref/reactive` | Session only | Dropdown open/closed, modal visibility, form input values |
| **App State** | Pinia Store | Store actions/mutations | Often persisted | User auth, user preferences, theme, language |
| **Server State** | Pinia Store (with caching) | Store + API layer | Cached | Data from API, paginated lists, search results |
| **Derived State** | Computed properties | Computed/getters | Never stored | Filtered lists, formatted dates, derived calculations |

---

## Pinia Store Structure

**Naming Convention:** kebab-case for store names

```
src/stores/
├── auth-store.ts
├── user-store.ts
├── product-store.ts
└── ui-store.ts (for non-data UI preferences)
```

**Store Best Practices:**
1. One store per feature/domain (not per component)
2. Keep stores lightweight and predictable
3. Async operations handled in actions
4. Complex state mutations are clear and documented
5. Use getters for derived data (never store computed values)
6. State updates are traceable and debuggable
7. Avoid nested state structures; keep flat where possible
8. Organize logically by feature or domain

> See `references/tooling/` and the Pinia gotchas in `references/vue-core/` for setup-store reactivity rules (`storeToRefs`, returning all state).

---

## State Persistence Strategy

- Only persist essential state (auth tokens, user preferences)
- Use clear, intentional mechanisms (localStorage with safeguards)
- Document what's persisted and why
- Handle missing persisted state gracefully

---

## When to Use a Store

- Global application state
- Data shared across 3+ features
- Complex data with multiple mutations
- Persistent state (localStorage)

## When to Keep State Local

- UI state (dropdown open, modal visible)
- Form input values
- Temporary UI flags
- Component-specific animation state

---

---

## State Management Checklist

```
□ UI state in components (ref)
□ App state in Pinia stores
□ Derived data in computed properties
□ Async operations in store actions
□ State updates predictable & traceable
□ Store organized by feature/domain
□ Persistence intentional & documented
□ Error states managed
```

---

**Example:** `references/examples/ProductStore.ts`

**Related:** [data-flow](data-flow.md) · [performance](performance.md)
