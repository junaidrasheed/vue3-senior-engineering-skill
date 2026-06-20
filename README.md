# Vue 3 Senior Engineering Skill for Claude

A production-grade Claude skill that acts as a senior Vue 3 architect and code reviewer. Generates best-in-class Vue 3 code following modern patterns, enforces team conventions, and provides architectural guidance.

## Overview

This skill elevates Claude's Vue 3 capabilities beyond basic code generation. It:

- **Generates production-grade Vue 3 code** using Composition API, TypeScript, and clean architecture patterns
- **Acts as a senior code reviewer**, proactively identifying issues, suggesting abstractions, and reducing technical debt
- **Enforces standards** across components, composables, Pinia stores, and plugins
- **Optimizes for performance**, testing, and maintainability from day one
- **Provides architectural guidance** for scaling, refactoring, and team consistency
- **Supports Nuxt applications** with SSR patterns, auto-imports, middleware, and server boundaries

## What It Does

### Code Generation & Architecture
- Design and build production-ready Vue 3 components (feature, base, container variants)
- Create scalable composables with clear separation of concerns
- Build robust Pinia stores with TypeScript, actions, and getters
- Refactor legacy Options API code to modern Composition API
- Design application architecture (folder structure, data flow, patterns)

### Code Quality & Performance
- Enforce TypeScript strict mode with no implicit `any` types
- Optimize reactivity and minimize unnecessary re-renders
- Implement testing strategies (Vue Test Utils, Vitest)
- Review code for scalability, maintainability, and security
- Suggest better abstractions and design patterns

### Framework Support
- **Vue 3** with Composition API, TypeScript, and Vite
- **Nuxt 3** for SSR/hybrid applications with auto-imports and middleware
- **Pinia** for state management
- **Tailwind CSS** for styling
- **Vite** for build optimization

## Installation

### Option 1: Install from Skill Package

1. Download the latest `.skill` file from [releases](../../releases)
2. In Claude.ai, go to **Settings** → **Skills** → **Import Skill**
3. Upload the `.skill` file
4. The skill is now available in all conversations


### Option 2: Install via npx

If you already use npx to manage Skills on your machine or within your projects, run the following command to add this Skill to your preferred agent:

`npx add skill https://github.com/junaidrasheed/vue3-senior-engineering-skill`


### Option 3: Manual Installation (Copy Folder)

1. Clone this repository:
   ```bash
   git clone https://github.com/junaidrasheed/vue3-senior-engineering-skill
   ```

2. Copy the skill folder to Claude's custom skills directory:
   
   **macOS/Linux:**
   ```bash
   ~/.config/Claude/skills/
   ```
   
   **Windows:**
   ```
   %APPDATA%\Claude\skills\
   ```

3. Restart Claude and the skill will be available


## How to Use

The skill automatically triggers when you:

- Ask to **build or refactor Vue 3 components**
- Request **Pinia store setup** or updates
- Ask for **composable creation** or reusable logic patterns
- Want to **optimize Vue code** for performance
- Need **architectural guidance** for folder structure and data flow
- Request **code reviews** of Vue code
- Want to **convert Options API to Composition API**
- Ask about **Nuxt SSR patterns** or configuration
- Need **TypeScript validation** or type safety help

### Example Prompts

```
"Build a user profile component with async data loading and error handling"
"Refactor this Options API component to Composition API with proper TypeScript types"
"Create a Pinia store for authentication with actions for login/logout/refresh"
"Review this Vue component for performance issues and suggest optimizations"
"Set up a Nuxt application with server middleware and client-side store"
"Create a reusable composable for form handling with validation"
```

## Skill Structure

```
vue3-senior-engineering/
├── SKILL.md                          # Entry point: patterns + reference map
├── references/
│   ├── architecture/                 # Engineering standards (10 topic files + README)
│   │   ├── core-principles.md
│   │   ├── component-architecture.md
│   │   ├── sfc-structure.md
│   │   ├── state-management.md
│   │   ├── data-flow.md
│   │   ├── code-organization.md
│   │   ├── performance.md
│   │   ├── testing.md
│   │   ├── composables.md
│   │   ├── code-quality.md
│   │   └── anti-patterns.md
│   ├── tooling/                      # Team conventions (7 topic files + README)
│   │   ├── testing-stack.md
│   │   ├── http-api.md
│   │   ├── validation-error-handling.md
│   │   ├── date-utilities.md
│   │   ├── styling.md
│   │   ├── build-environment.md
│   │   └── nuxt-patterns.md
│   ├── vue-core/                     # Vue runtime deep-dives (5 topic files + README)
│   │   ├── reactivity.md
│   │   ├── adaptable-composables.md
│   │   ├── builtin-components.md
│   │   ├── provide-inject-and-refs.md
│   │   └── ssr-hydration.md
│   ├── routing/                      # Vue Router
│   │   └── vue-router.md
│   └── examples/                     # Runnable code examples & templates
└── README.md                         # This file
```

Each folder has a `README.md` index describing when to load each topic file (progressive disclosure).

## Key Principles

1. **Production-Grade First** — All code optimized and test-ready from day one
2. **Composition API Always** — Modern Vue 3 patterns; Options API only for legacy
3. **Type Safety Enforced** — Strict TypeScript, no implicit `any`, explicit returns
4. **Separation of Concerns** — Clear boundaries between UI, business logic, and data
5. **Senior-Level Collaboration** — Ask questions, offer alternatives, guide decisions
6. **Performance Conscious** — Optimize reactivity, minimize re-renders, reduce bundle size
7. **Testability Built-In** — Design for testing; include patterns by default
8. **Team Consistency** — Unified naming, file organization, and patterns

## Tech Stack

- **Vue.js 3** — Modern Composition API
- **TypeScript** — Strict mode, no implicit `any`
- **Pinia** — State management
- **Nuxt 3** — Full-stack framework (optional)
- **Tailwind CSS** — Utility-first styling
- **Vite** — Build tool & development server
- **Vue Test Utils** — Component testing
- **Vitest** — Unit test runner
- **ESLint + Prettier** — Code quality & formatting

## Core Features

### Components
- Feature components (smart, data-aware)
- Base/presentational components (dumb, reusable)
- Container components (layout & composition)
- Props validation, emits typing, slots

### Composables
- API integration and data fetching
- Form handling and validation
- UI state (modals, notifications, filters)
- Reusable business logic hooks

### State Management (Pinia)
- Store actions with async/await
- Type-safe getters and computed properties
- Module organization for scaling
- Devtools integration

### Performance
- Lazy component loading
- Route-based code splitting
- Computed property memoization
- Watchable optimization (debounce, throttle)
- Bundle analysis and optimization

### Nuxt Integration
- SSR-safe composables
- Server-side API routes
- Middleware for auth and guards
- Auto-import configuration
- Hybrid rendering strategies

## Examples & References

See the [`references/examples/`](references/examples/README.md) directory for:
- Component examples (base, presentational, feature) — all following the SFC conventions: `<template>` → `<script>` → `<style>`, script grouped by logical concern
- Pinia store patterns (`ProductStore.ts`)
- Composable patterns (`useFetchProducts.ts`)
- Adaptable composable with `MaybeRefOrGetter` (`useDocumentTitle.ts`)

> Authoring convention: see [SFC Structure](references/architecture/sfc-structure.md).

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes (update SKILL.md, add examples, improve docs)
4. Test with Claude to ensure the skill works as expected
5. Submit a pull request with a clear description

### Improvement Areas
- Additional composable patterns
- More advanced performance optimization techniques
- Nuxt-specific patterns and examples
- Testing strategy expansions
- Architecture decision records (ADRs)
- Integration with other libraries (VueUse, headless UI, etc.)

## Feedback & Issues

Have feedback or found an issue?

- **Report a bug**: Open an [issue](../../issues)
- **Request a feature**: Describe what you'd like the skill to do better
- **Share improvements**: Submit a PR with examples or pattern refinements

## License

MIT License — Use this skill freely in your projects. See [LICENSE](LICENSE) for details.

## Author

Created for senior Vue 3 engineers building production applications with Claude. Maintained by the community.

---

## Quick Links

- [SKILL.md](SKILL.md) — Entry point: full patterns and the reference map
- [Architecture](references/architecture/README.md) — Engineering standards, split by topic
- [Tooling](references/tooling/README.md) — Testing, HTTP, validation, styling, build, Nuxt
- [Vue Core](references/vue-core/README.md) — Reactivity, composables, built-ins, provide/inject, SSR
- [Routing](references/routing/vue-router.md) — Vue Router guards & lifecycle
- [Examples](references/examples/) — Real-world code examples

---

**Using this skill?** Share your feedback or improvements by opening an issue or PR. This skill is built by and for the community.
