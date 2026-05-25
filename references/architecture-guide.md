# Vue 3 Architecture & Engineering Standards

**Reference Document | Version 1.0 | Source: Efficient Frontend Architectures Guide**

---

## Table of Contents

1. [Core Principles](#core-principles)
2. [Component Architecture](#component-architecture)
3. [State Management](#state-management)
4. [Data Flow Patterns](#data-flow-patterns)
5. [Code Organization](#code-organization)
6. [Performance Optimization](#performance-optimization)
7. [Testing & Quality](#testing--quality)
8. [Composables & Reusable Logic](#composables--reusable-logic)

---

## Core Principles

### Foundation
- **Single Responsibility Principle (SRP)**: Each component/composable has one reason to change
- **Separation of Concerns**: Presentational logic separate from business logic
- **DRY (Don't Repeat Yourself)**: Reuse composables, utilities, and base components
- **SOLID Principles**: Apply appropriate design patterns for scalability
- **Pragmatism Over Dogma**: Architecture serves the team and users, not the other way around

### Key Tenets
1. **Self-Sufficient Components**: Minimal external configuration, predictable behavior across contexts
2. **Unidirectional Data Flow**: Props down, events up. No sibling-to-sibling direct communication
3. **Thoughtful State Management**: Distinguish UI state (local) vs application state (centralized) vs server state (cached)
4. **Accessibility First**: WCAG 2.1 AA minimum for all components
5. **Type Safety**: Strict TypeScript mode enforced across the codebase

---

## Component Architecture

### Component Types & Responsibilities

#### 1. **Base/Atomic Components**
Purpose: Foundation building blocks for the entire application
- Simplest form: Button, Input, Card, Badge, etc.
- Zero business logic, purely presentational
- Highly reusable, configured via props
- Full type safety with TypeScript
- Accessibility built-in (ARIA attributes, keyboard navigation)

**Characteristics:**
- Single, narrow responsibility
- Work independently of context
- Fully configurable via props
- Handle all states: default, loading, error, disabled
- Well-documented with usage examples

#### 2. **Feature/Smart Components (Containers)**
Purpose: Orchestrate multiple base components + business logic
- Connect to stores (Pinia)
- Handle API interactions
- Manage complex state transitions
- Coordinate child components
- Should remain <500 lines; split if larger

**Characteristics:**
- Own their data fetching logic
- Use composables for reusable logic
- Emit custom events for significant actions
- Handle loading/error/empty states
- Provide context to child components

#### 3. **Layout Components**
Purpose: Define page structure and organization
- Header, Sidebar, Footer, Main content area
- Minimal logic, mostly structural
- Use slots for flexible content injection
- Manage responsive behavior at this level

#### 4. **Presentational Components**
Purpose: Display UI based on props, emit events for interactions
- Pure functions of their props
- Zero side effects
- Easy to test and reuse
- Clear, readable templates

### Component Design Checklist

- [ ] Single, clear responsibility
- [ ] Props are fully typed (TypeScript strict mode)
- [ ] Works independently of context
- [ ] Events emitted for all significant interactions
- [ ] Internal state limited to UI concerns (dropdowns, modals, etc.)
- [ ] Properly documented with JSDoc/comments
- [ ] Handles loading, error, and empty states
- [ ] Accessibility requirements met (WCAG 2.1 AA)
- [ ] Works with design system/theme
- [ ] Component size ≤ 500 lines (split if larger)

---

## State Management

### State Categorization

| State Type | Location | Management | Persistence | Examples |
|-----------|----------|-----------|-------------|----------|
| **UI State** | Component | Local `ref/reactive` | Session only | Dropdown open/closed, modal visibility, form input values |
| **App State** | Pinia Store | Store actions/mutations | Often persisted | User auth, user preferences, theme, language |
| **Server State** | Pinia Store (with caching) | Store + API layer | Cached | Data from API, paginated lists, search results |
| **Derived State** | Computed properties | Computed/getters | Never stored | Filtered lists, formatted dates, derived calculations |

### Pinia Store Structure

**Naming Convention:** kebab-case for store names

**Structure Pattern:**
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

### State Persistence Strategy
- Only persist essential state (auth tokens, user preferences)
- Use clear, intentional mechanisms (localStorage with safeguards)
- Document what's persisted and why
- Handle missing persisted state gracefully

---

## Data Flow Patterns

### Core Pattern: Props Down, Events Up

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

### Alternative Patterns (When Needed)

#### Provide/Inject (Avoid Prop Drilling)
- Use for deeply nested component trees
- Document provided values clearly
- Type-safe with TypeScript
- Prefer explicit passing for clarity when possible

#### Composable Pattern (Shared Logic)
- Extract reusable stateful logic into composables
- Composables are functions returning reactive state
- Single-purpose, focused on one concern
- Can be used across components and stores

---

## Code Organization

### Directory Structure (Feature-Based)

```
src/
├── components/
│   ├── base/              # Atomic, reusable components
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   └── Card.vue
│   ├── common/            # Cross-feature components
│   │   ├── Header.vue
│   │   ├── Sidebar.vue
│   │   └── Footer.vue
│   └── features/          # Feature-specific components
│       ├── products/
│       │   ├── ProductList.vue (container)
│       │   ├── ProductCard.vue (presentational)
│       │   └── ProductDetail.vue (container)
│       └── users/
│           ├── UserProfile.vue (container)
│           └── UserAvatar.vue (presentational)
├── composables/           # Reusable stateful logic
│   ├── useAuth.ts
│   ├── usePagination.ts
│   ├── useFetch.ts
│   └── useForm.ts
├── stores/                # Pinia stores
│   ├── auth-store.ts
│   ├── user-store.ts
│   └── product-store.ts
├── services/              # API & external integrations
│   ├── api.ts             # Axios/fetch instance
│   ├── auth-service.ts
│   └── product-service.ts
├── types/                 # TypeScript types & interfaces
│   ├── common.ts
│   ├── api.ts
│   └── domain.ts
├── utils/                 # Pure utility functions
│   ├── formatting.ts
│   ├── validation.ts
│   └── helpers.ts
├── plugins/               # Vue plugins
│   ├── http-plugin.ts
│   └── notification-plugin.ts
├── middleware/            # Route guards, interceptors
├── constants/             # App constants, config
└── App.vue
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase | `ProductCard.vue`, `UserProfile.vue` |
| **Composables** | camelCase, `use*` prefix | `useAuth.ts`, `usePagination.ts` |
| **Stores** | kebab-case | `auth-store.ts`, `user-store.ts` |
| **Services** | camelCase | `productService.ts`, `authService.ts` |
| **Utilities** | camelCase | `formatDate.ts`, `validateEmail.ts` |
| **Types/Interfaces** | PascalCase | `User`, `Product`, `ApiResponse` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_TIMEOUT` |

### Directory Depth Rule
- Avoid more than 5-6 levels of nesting
- Prefer colocating related files
- Keep directory navigation intuitive

---

## Performance Optimization

### Component-Level Optimizations

#### 1. **Avoid Unnecessary Re-renders**
- Use `v-show` for frequent toggling (display: none)
- Use `v-if` for rare visibility changes
- Memoize expensive computed properties
- Use `defineAsyncComponent` for heavy components

#### 2. **Efficient Reactivity**
- Prefer computed properties over watchers (when appropriate)
- Watch only when side effects are needed
- Use shallow refs for non-reactive data structures
- Avoid creating reactive objects inside loops

#### 3. **Code Splitting**
- Lazy-load routes with `component: () => import(...)`
- Use dynamic imports for heavy utilities
- Consider size budgets for chunks

#### 4. **Image & Asset Optimization**
- Use responsive images (srcset, picture element)
- Lazy-load images below the fold
- Optimize image formats (WebP, AVIF)
- Use CDN for static assets

### Store-Level Optimizations

#### 1. **Minimize Store Updates**
- Batch related state updates
- Avoid updating entire objects when only a field changes
- Use getters for derived data (not stored)

#### 2. **Async Action Patterns**
```typescript
// Good: Clear loading/error states
const fetchData = async () => {
  isLoading.value = true;
  try {
    data.value = await api.get(...);
    error.value = null;
  } catch (err) {
    error.value = err;
  } finally {
    isLoading.value = false;
  }
};
```

#### 3. **Caching Strategy**
- Cache API responses in store
- Implement cache invalidation (time-based, manual, event-based)
- Avoid refetching identical requests

---

## Testing & Quality

### Test Coverage Strategy

**Target:** 80%+ overall coverage

| Type | Coverage | Tools | Purpose |
|------|----------|-------|---------|
| **Unit** | 80%+ | Vue Test Utils, Vitest | Test composables, utilities, store logic |
| **Integration** | 60%+ | Vue Test Utils | Test component interactions, data flow |
| **E2E** | 30%+ | Cypress, Playwright | Critical user flows, cross-feature interactions |

### Testing Best Practices

1. **Component Testing**
   - Test component behavior, not implementation details
   - Test props, events, slots
   - Test loading/error/empty states
   - Mock child components in isolation

2. **Composable Testing**
   - Test returned state and computed properties
   - Test side effects and watchers
   - Mock external dependencies (API, store)
   - Use `flushPromises()` for async operations

3. **Store Testing**
   - Test state mutations in isolation
   - Test action logic and async flows
   - Test getters with various state
   - Mock API calls

4. **Accessibility Testing**
   - Use jest-axe for automated checks
   - Test keyboard navigation
   - Test screen reader compatibility
   - Manual testing with actual screen readers

---

## Composables & Reusable Logic

### Composable Design Principles

#### 1. **Single Responsibility**
- Each composable does one thing well
- Extract smaller composables from larger ones
- Clear, focused purpose

#### 2. **Naming Convention**
- Prefix with `use*` (e.g., `useAuth`, `usePagination`)
- Name after primary purpose

#### 3. **Return Object Structure**
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

#### 4. **Avoid Side Effects in Setup**
- Keep setup pure and predictable
- Side effects go in watchers, not directly in composable body
- Clear documentation of side effects

### Common Composable Patterns

#### useAuth
```typescript
// Returns: user, isAuthenticated, login, logout, register
// Integrates with: auth-store, authentication service
```

#### useFetch (Data Loading)
```typescript
// Returns: data, loading, error, refetch
// Handles: API calls, error states, auto-refetch
```

#### usePagination
```typescript
// Returns: currentPage, pageSize, total, hasNextPage, goToPage
// Coordinates with: data store, API pagination params
```

#### useForm
```typescript
// Returns: form, errors, isDirty, reset, submit
// Handles: Form state, validation, submission
```

---

## Code Quality Standards

### TypeScript

- **Mode:** Strict (`tsconfig.json: "strict": true`)
- **No `any` types** (except unavoidable legacy code)
- **Explicit return types** on functions
- **Proper typing** of props, emits, generics
- **Use discriminated unions** for complex types

### Formatting & Linting

- **Prettier:** Enforced (not ESLint)
- **No semicolons** in configuration
- **Print width:** 80-100 characters
- **Trailing comma:** ES5 (preserve compatibility)
- **Config file:** `.prettierrc` in root

### Documentation

- **Components:** JSDoc for public API
- **Composables:** Clear purpose, params, returns documented
- **Complex logic:** Inline comments explaining "why", not "what"
- **Stores:** Document state shape, action purposes
- **README:** Document project structure for new developers

### Code Review Checklist

- [ ] Follows naming conventions
- [ ] Single responsibility maintained
- [ ] Props/returns properly typed
- [ ] No prop drilling (max 3 levels)
- [ ] Proper separation of concerns
- [ ] Accessibility requirements met
- [ ] Performance considerations addressed
- [ ] Testability standards met
- [ ] Documentation complete
- [ ] No unnecessary dependencies added

---

## Practical Guidelines

### When to Create a Composable
- Logic used in 2+ components
- Complex state management logic
- Reusable utilities with side effects
- Cross-cutting concerns (auth, notifications)

### When to Use a Store
- Global application state
- Data shared across 3+ features
- Complex data with multiple mutations
- Persistent state (localStorage)

### When to Keep State Local
- UI state (dropdown open, modal visible)
- Form input values
- Temporary UI flags
- Component-specific animation state

### Component Size Guidelines
- **< 200 lines:** Ideal
- **200-500 lines:** Acceptable, consider splitting
- **> 500 lines:** Refactor into smaller units

---

## Anti-Patterns to Avoid

1. **Two-way binding beyond form inputs** (v-model on parent data)
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

**Document maintained by:** Engineering Team  
**Last updated:** November 2025  
**Next review:** November 2026
