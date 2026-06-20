# Nuxt-Specific Patterns

**Reference: Tooling & Conventions | Team-Specific Configuration**

---

## Project Structure

```
nuxt-app/
├── app.vue                # Root component
├── nuxt.config.ts         # Nuxt configuration
├── pages/                 # Auto-routed pages
│   ├── index.vue
│   ├── products.vue
│   └── products/
│       └── [id].vue       # Dynamic routes
├── components/            # Auto-registered
├── composables/           # Auto-imported
├── stores/                # Pinia stores
├── utils/                 # Auto-imported (optional)
├── middleware/            # Route guards
├── plugins/               # Plugins
├── public/                # Static assets
└── server/                # Server routes
    ├── api/
    ├── middleware/
    └── utils/
```

---

## Auto-Imports (Nuxt 3)

**Configured Directories (typically auto-imported):**
- `app.vue` — Root component
- `composables/` — Composables (auto-imported)
- `components/` — Components (auto-registered)
- `pages/` — Routes (auto-generated)
- `utils/` — Utilities (optionally auto-imported)

**Manual Setup:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    dirs: ['./composables', './utils'],
  },
  components: {
    dirs: ['./components/base', './components/features'],
  },
});
```

---

## Server/Client Boundaries

**Server-Only Code:**
```typescript
// composables/useServerData.server.ts
export const useServerData = () => {
  // Runs only on server
};
```

**Client-Only Components:**
```vue
<!-- components/ClientChart.client.vue -->
<script setup>
// Runs only on client
</script>
```

**Middleware (Route Guards):**
```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Guard logic
});

// pages/admin.vue
definePageMeta({
  middleware: 'auth',
});
```

---

## Nuxt-Specific Composables

**useAsyncData (Data Fetching):**
```typescript
const { data, pending, error, refresh } = await useAsyncData(
  'users',
  () => $fetch('/api/users')
);
```

**useFetch (Convenience):**
```typescript
const { data, pending } = useFetch('/api/users');
```

**useRouter, useRoute (Navigation):**
```typescript
const router = useRouter();
const route = useRoute();
```

**$fetch (Server-Safe HTTP):**
```typescript
// Works in SSR and client
const data = await $fetch('/api/users');

// With transformations
const users = await $fetch('/api/users', {
  transform: (response) => response.data,
});
```

---

## Server Routes & API

```typescript
// server/api/products.get.ts
export default defineEventHandler(async (event) => {
  return await getProducts();
});

// Usage in a component/page
const { data: products } = await useFetch('/api/products');
```

---

> SSR/hydration correctness (mismatch causes, cross-request state pollution, browser-only APIs) is covered in `references/vue-core/ssr-hydration.md`.

---

**Related:** [http-api](http-api.md) · [build-environment](build-environment.md)
