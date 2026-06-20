# Tooling & Convention Reference

Team-specific tooling decisions, split into focused topics. Load only the file relevant to the task.

| File | Use when |
|------|----------|
| [testing-stack](testing-stack.md) | Vitest + Vue Test Utils setup, file naming, factory patterns |
| [http-api](http-api.md) | Fetch-based HTTP client, request/response transforms, plugin injection |
| [validation-error-handling](validation-error-handling.md) | Zod schemas; error logging conventions |
| [date-utilities](date-utilities.md) | day.js; one-function-per-file utilities |
| [styling](styling.md) | Tailwind CSS v4, utility composition, dynamic-class gotcha |
| [build-environment](build-environment.md) | Vite config, aliases, env vars |
| [nuxt-patterns](nuxt-patterns.md) | Nuxt 3 auto-imports, server/client boundaries, data fetching |

## Summary: Key Tooling Decisions

| Category | Choice | Rationale |
|----------|--------|-----------|
| **Testing** | Vitest + Vue Test Utils | Fast, native ESM, great DX |
| **HTTP** | Fetch API | Lightweight, built-in, fetch > axios |
| **Validation** | Zod | Type-safe, composable schemas |
| **Date/Time** | day.js | Lightweight lodash alternative |
| **Styling** | Tailwind CSS v4 | Utility-first, scalable, no CSS scoping |
| **Build** | Vite | Fast, native ESM, modern tooling |
| **Framework** | Vue 3 + Nuxt (optional) | Composition API, SSR when needed |

> Architecture standards live in `../architecture/`. Vue runtime deep-dives live in `../vue-core/` and `../routing/`.
