# Component Architecture

**Reference: Architecture | Vue 3 Senior Engineering Standards**

---

> **Every component follows a fixed layout** — block order `<template>` → `<script setup>` → `<style>`, and a script organized by logical concern (each concern under a single-line comment header). This is mandatory; see [sfc-structure](sfc-structure.md).

---

## Component Types & Responsibilities

### 1. Base/Atomic Components

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

### 2. Feature/Smart Components (Containers)

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

### 3. Layout Components

Purpose: Define page structure and organization

- Header, Sidebar, Footer, Main content area
- Minimal logic, mostly structural
- Use slots for flexible content injection
- Manage responsive behavior at this level

### 4. Presentational Components

Purpose: Display UI based on props, emit events for interactions

- Pure functions of their props
- Zero side effects
- Easy to test and reuse
- Clear, readable templates

---

## Component Design Checklist

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

## Component Size Guidelines

- **< 200 lines:** Ideal
- **200-500 lines:** Acceptable, consider splitting
- **> 500 lines:** Refactor into smaller units

---

**Examples:** `references/examples/BaseComponent.vue` · `references/examples/FeatureComponent.vue` · `references/examples/PresentationalComponent.vue`

**Related:** [code-organization](code-organization.md) · [data-flow](data-flow.md) · [composables](composables.md)
