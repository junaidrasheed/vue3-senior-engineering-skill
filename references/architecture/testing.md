# Testing & Quality

**Reference: Architecture | Vue 3 Senior Engineering Standards**

> For the team-specific testing stack, file naming, and factory patterns, see `references/tooling/testing-stack.md`.

---

## Test Coverage Strategy

**Target:** 80%+ overall coverage

| Type | Coverage | Tools | Purpose |
|------|----------|-------|---------|
| **Unit** | 80%+ | Vue Test Utils, Vitest | Test composables, utilities, store logic |
| **Integration** | 60%+ | Vue Test Utils | Test component interactions, data flow |
| **E2E** | 30%+ | Playwright, Cypress | Critical user flows, cross-feature interactions |

---

## Testing Best Practices

### 1. Component Testing

- Test component behavior, not implementation details (black-box approach)
- Test props, events, slots
- Test loading/error/empty states
- Mock child components in isolation

### 2. Composable Testing

- Test returned state and computed properties
- Test side effects and watchers
- Mock external dependencies (API, store)
- Use `flushPromises()` for async operations
- Composables that use lifecycle hooks or `inject` require a host-component wrapper

### 3. Store Testing

- Test state mutations in isolation
- Test action logic and async flows
- Test getters with various state
- Mock API calls; set a fresh Pinia per test (`setActivePinia(createPinia())`)

### 4. Accessibility Testing

- Use jest-axe / axe-core for automated checks
- Test keyboard navigation
- Test screen reader compatibility
- Manual testing with actual screen readers

### 5. Avoid Snapshot-Only Tests

- Snapshots keep passing even when functionality breaks
- Assert on behavior and rendered output, not just serialized trees

---

**Related:** `references/tooling/testing-stack.md` · [composables](composables.md)
