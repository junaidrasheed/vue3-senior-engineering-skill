# Changelog

All notable changes to the **vue3-senior-engineering** skill are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-06-20

Major restructure of the skill from a single large `SKILL.md` into a thin entry
point that routes to focused, single-topic reference files (progressive
disclosure), plus new Vue runtime coverage and enforced authoring conventions.

> **Breaking:** the two monolithic reference docs were removed and replaced by
> folders. Any external links to `references/architecture-guide.md` or
> `references/tooling-conventions.md` must be updated to the new paths.

### Added
- **`references/architecture/`** — engineering standards split into 11 topic
  files (`core-principles`, `component-architecture`, `sfc-structure`,
  `state-management`, `data-flow`, `code-organization`, `performance`, `testing`,
  `composables`, `code-quality`, `architecture-decision-records`,
  `anti-patterns`) with a README index.
- **`references/tooling/`** — team conventions split into 7 topic files
  (`testing-stack`, `http-api`, `validation-error-handling`, `date-utilities`,
  `styling`, `build-environment`, `nuxt-patterns`) with a README index.
- **`references/vue-core/`** — new Vue runtime deep-dives: `reactivity`,
  `adaptable-composables`, `builtin-components`, `provide-inject-and-refs`,
  `ssr-hydration`. Informed by the community
  [vuejs-ai/skills](https://github.com/vuejs-ai/skills) collection (MIT),
  distilled into this skill's voice ("essentials only" scope).
- **`references/routing/vue-router.md`** — navigation guards, param-change
  lifecycle, redirect-loop and async-guard gotchas.
- **`references/architecture/sfc-structure.md`** — codifies the mandatory SFC
  layout (see Changed).
- **`references/examples/useDocumentTitle.ts`** — adaptable-composable example
  (`MaybeRefOrGetter`, `toRef`/`toValue`, `onScopeDispose`).
- **`references/examples/README.md`** — index of the runnable examples and the
  conventions they demonstrate.
- A **Reference Library** routing map in `SKILL.md` (per-folder tables + a
  task → files rule of thumb).

### Changed
- **`SKILL.md` slimmed from ~1,445 lines to ~149** — now an entry point holding
  operating principles, when-to-use, the plan-first workflow, non-negotiable
  conventions, and the reference map. Full content parity with the previous
  version was verified before trimming.
- **Mandatory SFC conventions** applied across all examples and documented in
  `sfc-structure.md`:
  1. Block order is `<template>` → `<script setup lang="ts">` → `<style>`
     (template first).
  2. Script is grouped by **logical concern** (each under a single-line comment
     header), not by API type.
- All `.vue` examples (`BaseComponent`, `PresentationalComponent`,
  `FeatureComponent`) reworked to follow the conventions; `FeatureComponent`
  expanded to demonstrate multiple concerns.
- Expanded reference content to preserve all code that previously lived inline in
  `SKILL.md` (worked test examples, full HTTP client + service layer, Tailwind
  responsive/dark-mode, Nuxt project structure & server routes, `.prettierrc`,
  JSDoc, performance snippets, ADR template, checklists).

### Removed
- `references/architecture-guide.md` (split into `references/architecture/`).
- `references/tooling-conventions.md` (split into `references/tooling/`).

### Notes
- All internal links and prose references validated (32 markdown files).
- Functionally tested: an agent reading the new structure produces conforming
  output (template-first, concern-grouped, typed, all states handled).

---

## [1.0.0] — 2025-11

- Initial release: single `SKILL.md` with `architecture-guide.md` and
  `tooling-conventions.md` reference docs and example components.

[2.0.0]: https://github.com/junaidrasheed/vue3-senior-engineering-skill/releases/tag/v2.0.0
[1.0.0]: https://github.com/junaidrasheed/vue3-senior-engineering-skill/releases/tag/v1.0.0
