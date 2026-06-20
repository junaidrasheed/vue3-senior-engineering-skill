# Architecture Decision Records (ADRs)

**Reference: Architecture | Vue 3 Senior Engineering Standards**

Document significant architectural decisions as ADRs so the *why* survives team turnover.

---

## Good candidates for an ADR

- Framework or tool choices (Vue vs React, Pinia vs Vuex)
- Architecture patterns (container/presentational, feature-based)
- State management strategy (centralized vs distributed)
- Styling approach (Tailwind vs CSS Modules)
- API integration patterns (REST vs GraphQL)
- Testing strategy (unit vs integration focus)
- Deployment & build strategy (code splitting, versioning)

---

## Template

```markdown
# ADR-001: Use Composition API for Vue Components

## Status
Accepted

## Context
We needed to choose between Options API and Composition API for our Vue 3 codebase.

## Decision
We will use Composition API exclusively for all new components and gradually migrate
existing Options API code.

## Rationale
- Better code organization for large components
- Easier to compose and reuse logic
- Superior TypeScript support
- Industry standard for Vue 3

## Consequences
- Team members need training on Composition API patterns
- Refactoring of legacy Options API components
- Better long-term maintainability
```

---

**Related:** [core-principles](core-principles.md) · [code-quality](code-quality.md)
