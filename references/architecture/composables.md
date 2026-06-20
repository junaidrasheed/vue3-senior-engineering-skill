# Composables & Reusable Logic

**Reference: Architecture | Vue 3 Senior Engineering Standards**

> For library-grade composables that accept reactive **or** plain inputs (`MaybeRef` / `toValue`), see `references/vue-core/adaptable-composables.md`.

---

## Composable Design Principles

### 1. Single Responsibility

- Each composable does one thing well
- Extract smaller composables from larger ones
- Clear, focused purpose

### 2. Naming Convention

- Prefix with `use*` (e.g., `useAuth`, `usePagination`)
- Name after primary purpose

### 3. Return Object Structure

```typescript
const useMyComposable = () => {
  // State
  const value = ref(initialValue);

  // Computed
  const derived = computed(() => ...);

  // Methods
  const update = (newValue) => { ... };

  // Return organized by type: state, computed, methods
  return {
    // State
    value,
    // Computed
    derived,
    // Methods
    update
  };
};
```

### 4. Avoid Side Effects in Setup

- Keep setup pure and predictable
- Side effects go in watchers/lifecycle hooks, not directly in composable body
- Register cleanup (`onScopeDispose` / `onUnmounted`) for listeners and timers
- Clear documentation of side effects

---

## Common Composable Patterns

### useAuth
```typescript
// Returns: user, isAuthenticated, login, logout, register
// Integrates with: auth-store, authentication service
```

### useFetch (Data Loading)
```typescript
// Returns: data, loading, error, refetch
// Handles: API calls, error states, auto-refetch
```

### usePagination
```typescript
// Returns: currentPage, pageSize, total, hasNextPage, goToPage
// Coordinates with: data store, API pagination params
```

### useForm
```typescript
// Returns: form, errors, isDirty, reset, submit
// Handles: Form state, validation, submission
```

---

## When to Create a Composable

- Logic used in 2+ components
- Complex state management logic
- Reusable utilities with side effects
- Cross-cutting concerns (auth, notifications)

---

**Example:** `references/examples/useFetchProducts.ts`

**Related:** [data-flow](data-flow.md) · `references/vue-core/adaptable-composables.md` · `references/vue-core/reactivity.md`
