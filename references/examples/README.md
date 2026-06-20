# Examples

Runnable, canonical examples. Every `.vue` example follows the mandatory SFC conventions in [`../architecture/sfc-structure.md`](../architecture/sfc-structure.md):

1. **Block order:** `<template>` → `<script setup>` → `<style>`
2. **Concern-grouped script:** code is grouped by logical concern, each opened by a single-line comment header (`// PRICING`, `// SELECTION`, …) — not grouped by API type.

| File | Type | Demonstrates |
|------|------|--------------|
| [BaseComponent.vue](BaseComponent.vue) | Base/atomic | Template-first, concerns `STYLING` / `CLICK`, slots, a11y, Tailwind |
| [PresentationalComponent.vue](PresentationalComponent.vue) | Presentational | Pure props→UI, concerns `PRICING` / `SELECTION`, keyboard a11y |
| [FeatureComponent.vue](FeatureComponent.vue) | Feature/container | Multi-concern: `PRODUCT DATA` / `SEARCH & FILTER` / `SELECTION` / `RETRY`, store + router + logger |
| [ProductStore.ts](ProductStore.ts) | Pinia store | Setup store: state, getters, async actions |
| [useFetchProducts.ts](useFetchProducts.ts) | Composable | Single-concern data-fetching composable |
| [useDocumentTitle.ts](useDocumentTitle.ts) | Adaptable composable | `MaybeRefOrGetter` input, `toRef`/`toValue`, `onScopeDispose` cleanup |

> The concern comment headers double as **extraction seams**: when a concern block grows large, lift it into a `use<Concern>()` composable.
