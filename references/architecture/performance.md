# Performance Optimization

**Reference: Architecture | Vue 3 Senior Engineering Standards**

> Performance work is a **post-functionality pass**. Do not optimize before core behavior is implemented and verified.

---

## Component-Level Optimizations

### 1. Avoid Unnecessary Re-renders

- Use `v-show` for frequent toggling (display: none)
- Use `v-if` for rare visibility changes
- Memoize expensive computed properties
- Use `defineAsyncComponent` for heavy components

### 2. Efficient Reactivity

- Prefer computed properties over watchers (when appropriate)
- Watch only when side effects are needed
- Use shallow refs for non-reactive data structures
- Avoid creating reactive objects inside loops

> Deep dive: `references/vue-core/reactivity.md`

### 3. Code Splitting

- Lazy-load routes with `component: () => import(...)`
- Use dynamic imports for heavy utilities
- Consider size budgets for chunks

### 4. Image & Asset Optimization

- Use responsive images (srcset, picture element)
- Lazy-load images below the fold
- Optimize image formats (WebP, AVIF)
- Use CDN for static assets

```html
<!-- Responsive images -->
<img
  srcset="image-small.jpg 480w, image-large.jpg 1024w"
  sizes="(max-width: 600px) 480px, 1024px"
  src="image-large.jpg"
  alt="Description"
/>

<!-- Format negotiation + lazy load below the fold -->
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>
```

### Async components with loading/error UI

```typescript
const Chart = defineAsyncComponent({
  loader: () => import('@/components/Chart.vue'),
  loadingComponent: LoadingSpinner,
  delay: 200,
});
```

### 5. List & Render Optimizations

- Virtualize very large lists (windowing) instead of rendering all rows
- Use `v-once` for static subtrees and `v-memo` for expensive conditional re-renders
- Always provide a stable, unique `:key` on `v-for`
- Avoid over-abstracting components in hot list paths

---

## Store-Level Optimizations

### 1. Minimize Store Updates

- Batch related state updates
- Avoid updating entire objects when only a field changes
- Use getters for derived data (not stored)

### 2. Async Action Patterns

```typescript
// Good: Clear loading/error states
const fetchData = async () => {
  isLoading.value = true;
  try {
    data.value = await api.get(...);
    error.value = null;
  } catch (err) {
    error.value = err;
  } finally {
    isLoading.value = false;
  }
};
```

### 3. Caching Strategy

- Cache API responses in store
- Implement cache invalidation (time-based, manual, event-based)
- Avoid refetching identical requests

```typescript
// Time-based cache invalidation
const cacheTimestamp = ref<number | null>(null);
const cacheValidityMs = 5 * 60 * 1000; // 5 minutes

const shouldFetch = computed(() => {
  if (!cacheTimestamp.value) return true;
  return Date.now() - cacheTimestamp.value > cacheValidityMs;
});

// Batch state updates — apply all changes at once, not field-by-field
const updateUserProfile = async (changes: Partial<User>) => {
  const updated = await userService.update(changes);
  Object.assign(user.value, updated);
};
```

---

## Bundle Size Monitoring

- Profile bundle with `npm run analyze`
- Set size budgets for chunks
- Use dynamic imports for large features
- Tree-shake unused code (proper ES module syntax)

---

**Related:** [state-management](state-management.md) · `references/vue-core/reactivity.md`
