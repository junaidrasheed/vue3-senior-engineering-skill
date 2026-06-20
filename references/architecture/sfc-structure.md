# SFC Structure & Script Organization

**Reference: Architecture | Vue 3 Senior Engineering Standards**

How every `.vue` Single-File Component in this codebase is laid out. These rules are mandatory — they make components scannable and keep related logic physically together.

---

## 1. Block order: `<template>` → `<script setup>` → `<style>`

Template **first**. A reader sees *what* the component renders before *how* it works, and the markup is the component's contract with its parent.

```vue
<template>
  <!-- markup -->
</template>

<script setup lang="ts">
  // logic
</script>

<style scoped>
  /* styles — rare; prefer Tailwind utilities */
</style>
```

---

## 2. Organize the script by **logical concern**, not by API type

Do **not** group all `ref`s, then all `computed`s, then all methods. That scatters one feature across the file. Instead, group by feature/concern: each concern owns all of its state, computed, watchers, lifecycle, and methods, together.

### Each concern starts with a single-line comment header

A short, uppercase, single-line comment names the concern and opens its block. Everything beneath — until the next header — belongs to that concern.

```vue
<script setup lang="ts">
// Imports first
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// The component contract: props, emits, models (no concern header — this is the public API)
const props = withDefaults(defineProps<Props>(), {
  socials: () => [],
  linkedItemsLabel: 'Related Tokens',
})

// BANNER — resize observation + exposed width
const banner = ref<HTMLElement | null>(null)
const width = ref(0)
onMounted(() => {
  if (banner.value) {
    new ResizeObserver(() => {
      width.value = banner.value!.clientWidth
    }).observe(banner.value)
  }
})
defineExpose({ width })

// OVERFLOWS — collapse badges/links when the banner is narrow
const displayMode = ref<'less' | 'all'>('less')
const linkedItemsDisplayLimit = ref(2)
const badges = computed(() => [...props.categories, ...props.attributes])
watch(width, () => {
  linkedItemsDisplayLimit.value = width.value < 700 ? 0 : 2
})

// SUB NAVIGATION — derive active sub-pages from the current route
const route = useRoute()
const paths = computed(() =>
  route.path.split('/').filter((x) => !['', props.entity, route.params?.id].includes(x))
)
const subPageNavigationItems = computed(() => {
  const active = paths.value.length
    ? props.navigationLinks?.find((x) => x.id === paths.value[0])
    : props.navigationLinks?.find((x) => x.id === 'overview')
  return active?.subPages ?? []
})
function isActiveRoute(item: NavItem) {
  return item.to === route.path || !!item.subPages?.some((s) => s.to === route.path)
}
</script>
```

---

## Rules

1. **Imports** sit at the very top.
2. **Contract next** — `defineProps` / `defineEmits` / `defineModel`. This is the component's public API; no concern header needed.
3. **Then concern blocks**, each opened by a single-line comment header (`// BANNER`, `// OVERFLOWS`, `// SUB NAVIGATION`).
4. **Keep a concern self-contained** — its `ref`s, `computed`s, `watch`ers, lifecycle hooks, and functions all live under its header, in whatever order reads best for that feature.
5. **`defineExpose`** goes inside the concern whose value it exposes (e.g. under `// BANNER`), not in a separate "exposes" section.
6. **Order concerns by importance / reading flow** — primary feature first, peripheral concerns later.
7. **If a concern grows large**, that's the signal to extract it into a **composable** (`use<Concern>()`) — the comment header is already telling you the boundary.

> Concern headers are extraction seams. When `// OVERFLOWS` becomes 40 lines, it should become `useOverflow()`. See [composables](composables.md).

---

## Why concern-grouping over type-grouping

- **Locality of behavior**: to understand or change a feature you read one contiguous block, not three scattered sections.
- **Safer edits**: deleting a feature means deleting one block, not hunting refs/computeds/methods across the file.
- **Natural refactor boundaries**: each header is a candidate composable.

---

**Related:** [component-architecture](component-architecture.md) · [composables](composables.md) · examples in `../examples/`
