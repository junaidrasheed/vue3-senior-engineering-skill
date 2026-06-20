# Architecture Reference

Vue 3 architecture & engineering standards, split into focused topics. Load only the file relevant to the task at hand.

| File | Use when |
|------|----------|
| [core-principles](core-principles.md) | Establishing foundational design rules (SRP, SoC, data flow tenets) |
| [component-architecture](component-architecture.md) | Designing components — base, container, layout, presentational types & checklist |
| [sfc-structure](sfc-structure.md) | SFC block order (template → script → style) and concern-grouped script organization |
| [state-management](state-management.md) | Deciding where state lives (UI vs app vs server vs derived); Pinia structure |
| [data-flow](data-flow.md) | Props down/events up, provide/inject, composable patterns |
| [code-organization](code-organization.md) | Folder structure and naming conventions |
| [performance](performance.md) | Render, reactivity, store, bundle, and list optimizations (post-functionality pass) |
| [testing](testing.md) | Coverage strategy and unit/integration/E2E best practices |
| [composables](composables.md) | Designing reusable stateful logic |
| [code-quality](code-quality.md) | TypeScript, Prettier (`.prettierrc`), comments, JSDoc, review checklist |
| [architecture-decision-records](architecture-decision-records.md) | When and how to write ADRs (with template) |
| [anti-patterns](anti-patterns.md) | What to avoid |

> Tooling/team conventions live in `../tooling/`. Vue runtime deep-dives live in `../vue-core/` and `../routing/`.
