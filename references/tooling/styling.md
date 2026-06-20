# Styling

**Reference: Tooling & Conventions | Team-Specific Configuration**

---

## Framework: Tailwind CSS v4

**Principles:**
- Utility-first, composition-based
- Avoid component-level scoping
- Use class composition, not CSS nesting
- Design system variables via theme config

**Location:**
```
src/
├── styles/
│   └── globals.css    # Global utilities, CSS variables
├── components/
│   └── Button.vue     # Use <style> only for scoped logic (rare)
```

---

## Global Styles Pattern

```css
/* src/styles/globals.css */
@import "tailwindcss";

/* CSS Variables for design tokens */
:root {
  --color-primary: theme(colors.blue.600);
  --color-danger: theme(colors.red.600);
  --spacing-xs: theme(spacing.2);
}

/* Reusable class compositions (use sparingly — only high-frequency patterns) */
@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center px-4 py-2 rounded font-medium
           bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800
           disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center px-4 py-2 rounded font-medium
           border-2 border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50;
  }

  .input-base {
    @apply w-full px-3 py-2 border border-gray-300 rounded
           focus:outline-none focus:ring-2 focus:ring-blue-500;
  }

  .container-padding {
    @apply px-4 py-6 sm:px-6 lg:px-8;
  }
}

/* Global utilities (minimize these) */
body {
  @apply bg-white text-gray-900;
}
```

---

## Component Usage

```vue
<template>
  <button class="btn-primary">Submit</button>
  <input class="input-base" />
</template>

<!-- Composition: combine utilities directly -->
<div class="flex gap-4 items-center justify-between p-6">
  <!-- Content -->
</div>
```

**No scoped styles unless absolutely necessary:**
```vue
<!-- ✗ Avoid -->
<style scoped>
.my-button {
  @apply px-4 py-2 bg-blue-600;
}
</style>

<!-- ✓ Prefer: Use globals or inline utilities -->
<template>
  <button class="px-4 py-2 bg-blue-600 text-white rounded">Button</button>
</template>
```

---

## Responsive Design

Mobile-first; layer breakpoints upward.

```vue
<template>
  <!-- Stack on mobile, grid on tablet+, flex on desktop -->
  <div class="flex flex-col gap-4 md:grid md:grid-cols-2 lg:flex lg:flex-row">
    <div class="flex-1">Card 1</div>
    <div class="flex-1">Card 2</div>
  </div>
</template>
```

---

## Dark Mode (if supported)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: theme(colors.blue.400);
  }
}
```

---

## Tailwind Best Practices

1. **Utility composition over custom CSS** (keep styles in templates)
2. **Design tokens via CSS variables** (theme consistency)
3. **No component-level scoping** (prefer global utilities)
4. **Responsive-first** (mobile → tablet → desktop)
5. **Semantic class names** (`.btn-primary`, not `.blue-button`)
6. **Reuse only high-frequency patterns** (buttons, inputs, cards)
7. **Keep globals.css minimal** (< 100 lines of custom CSS)

---

## Gotcha: Dynamic Class Generation

Tailwind only generates classes it can see as **complete strings** at build time. Do not build class names dynamically by concatenation:

```vue
<!-- ✗ Purged: `text-${color}-600` is never emitted -->
<div :class="`text-${color}-600`" />

<!-- ✓ Map to full static class strings -->
<div :class="{ 'text-red-600': isError, 'text-green-600': isOk }" />
```

---

**Related:** [build-environment](build-environment.md)
