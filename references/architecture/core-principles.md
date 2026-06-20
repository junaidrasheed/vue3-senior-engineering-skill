# Core Principles

**Reference: Architecture | Vue 3 Senior Engineering Standards**

---

## Foundation

- **Single Responsibility Principle (SRP)**: Each component/composable has one reason to change
- **Separation of Concerns**: Presentational logic separate from business logic
- **DRY (Don't Repeat Yourself)**: Reuse composables, utilities, and base components
- **SOLID Principles**: Apply appropriate design patterns for scalability
- **Pragmatism Over Dogma**: Architecture serves the team and users, not the other way around

## Key Tenets

1. **Self-Sufficient Components**: Minimal external configuration, predictable behavior across contexts
2. **Unidirectional Data Flow**: Props down, events up. No sibling-to-sibling direct communication
3. **Thoughtful State Management**: Distinguish UI state (local) vs application state (centralized) vs server state (cached)
4. **Accessibility First**: WCAG 2.1 AA minimum for all components
5. **Type Safety**: Strict TypeScript mode enforced across the codebase

---

**Related:** [component-architecture](component-architecture.md) · [data-flow](data-flow.md) · [state-management](state-management.md)
