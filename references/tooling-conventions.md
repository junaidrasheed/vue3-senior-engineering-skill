# Tooling & Convention Reference

**Team-Specific Configuration | Version 1.0**

---

## Testing Stack

### Framework: Vitest + Vue Test Utils

**File Naming:** `{ComponentName}.spec.ts` or `{functionName}.spec.ts`

**Location:** 
- Component specs: `src/components/__tests__/{feature}/`
- Composable specs: `src/composables/__tests__/`
- Utility specs: `src/utils/__tests__/`
- Store specs: `src/stores/__tests__/`

**Pattern: Factory Functions**

```typescript
// Example: createUserMock factory
const createUserMock = (overrides?: Partial<User>): User => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  ...overrides
});

// Usage in tests
const user = createUserMock({ name: 'Jane' });
```

**Test File Structure:**
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';

describe('MyComponent', () => {
  // Shared setup
  
  describe('rendering', () => {
    // Related tests grouped
  });
  
  describe('interactions', () => {
    // Related tests grouped
  });
});
```

**Coverage Target:** 80%+ overall

---

## HTTP & API Integration

### Client: Fetch API (Not Axios)

**Setup Pattern:**

```typescript
// src/services/http.ts
interface FetchOptions extends RequestInit {
  baseURL?: string;
  params?: Record<string, any>;
  timeout?: number;
}

interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
}

const createHttpClient = (baseURL: string) => {
  return {
    get: async <T>(path: string, options?: FetchOptions) => { ... },
    post: async <T>(path: string, body?: any, options?: FetchOptions) => { ... },
    put: async <T>(path: string, body?: any, options?: FetchOptions) => { ... },
    delete: async <T>(path: string, options?: FetchOptions) => { ... },
  };
};

export const http = createHttpClient(import.meta.env.VITE_API_BASE_URL);
```

### Request/Response Transformation

**Request Transformation:**
```typescript
// Transform camelCase to snake_case for backend
const transformRequest = (data: Record<string, any>) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    acc[toSnakeCase(key)] = value;
    return acc;
  }, {});
};
```

**Response Transformation:**
```typescript
// Transform snake_case from backend to camelCase
const transformResponse = <T>(data: any): T => {
  if (Array.isArray(data)) {
    return data.map(transformResponse) as T;
  }
  if (data && typeof data === 'object') {
    return Object.entries(data).reduce((acc, [key, value]) => {
      acc[toCamelCase(key)] = value;
      return acc;
    }, {}) as T;
  }
  return data;
};
```

### Injection Pattern

**Plugin Setup:**
```typescript
// src/plugins/http-plugin.ts
import { App } from 'vue';
import { http } from '@/services/http';

export const httpPlugin = (app: App) => {
  // Provide to entire app
  app.provide('$http', http);
  
  // Global property (optional, for Options API)
  app.config.globalProperties.$http = http;
};

// main.ts
import { httpPlugin } from '@/plugins/http-plugin';
app.use(httpPlugin);
```

**Usage in Components/Composables:**
```typescript
// Via inject (Composition API, preferred)
const { inject } = require('vue');
const http = inject('$http');

// Or direct import (also acceptable)
import { http } from '@/services/http';
```

---

## Validation & Error Handling

### Validation: Zod

**Schema Definition:**
```typescript
import { z } from 'zod';

// Reusable schemas
const emailSchema = z.string().email('Invalid email');
const passwordSchema = z.string().min(8, 'Password must be 8+ chars');

// Domain schemas
const userSchema = z.object({
  id: z.string().uuid(),
  email: emailSchema,
  name: z.string().min(1),
  createdAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
```

**Usage in Composables:**
```typescript
const useUserValidation = () => {
  const validate = (data: unknown) => {
    try {
      return userSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { errors: error.errors };
      }
      throw error;
    }
  };
  
  return { validate };
};
```

**Location:** `src/validation/schemas.ts` (centralized)

### Error Handling

**Pattern: Application-Specific Logger/Reporter**
- Do NOT add custom error classes unless required
- Use application's existing logger/reporting system
- Log context, not just error message
- Example:

```typescript
// src/services/logger.ts (use existing app logger)
const handleApiError = (error: Error, context: string) => {
  logger.error({
    message: error.message,
    context,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });
};

// Usage
try {
  const data = await http.get('/users');
} catch (error) {
  handleApiError(error, 'fetchUsers');
}
```

---

## Date/Time & Utilities

### Framework: day.js

**Pattern: One Function Per File**

**Location:** `src/utils/`

**Naming:** `{functionName}.ts`

**Example Files:**
```
src/utils/
├── formatDate.ts
├── formatTime.ts
├── addDays.ts
├── isDatePast.ts
├── getDaysDifference.ts
└── parseISODate.ts
```

**File Example:**
```typescript
// src/utils/formatDate.ts
import dayjs from 'dayjs';

/**
 * Format a date to YYYY-MM-DD
 * @param date - Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  return dayjs(date).format('YYYY-MM-DD');
};
```

### Global Import Pattern

**Setup:**
```typescript
// src/utils/index.ts
export { formatDate } from './formatDate';
export { formatTime } from './formatTime';
export { addDays } from './addDays';
// ... etc
```

**Usage in Components (Auto-Import via Vite Aliases):**
```typescript
// No manual import needed if auto-import configured
import { formatDate, addDays } from '@/utils';

const formattedDate = formatDate(new Date());
```

---

## Styling

### Framework: Tailwind CSS v4

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

**Global Styles Pattern:**
```css
/* src/styles/globals.css */
@import "tailwindcss";

/* CSS Variables for design tokens */
:root {
  --color-primary: theme(colors.blue.600);
  --color-danger: theme(colors.red.600);
  --spacing-xs: theme(spacing.2);
}

/* Reusable class compositions */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700;
  }
  
  .input-base {
    @apply w-full px-3 py-2 border border-gray-300 rounded;
  }
}
```

**Component Usage:**
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

## Build & Environment

### Build Tool: Vite

**Reliance:** Native application setup for build configuration

**Import Aliases (Standard Setup):**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Environment Variables:**
```
.env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MyApp
```

**Usage:**
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## Nuxt-Specific Patterns

### Auto-Imports (Nuxt 3)

**Configured Directories (typically auto-imported):**
- `app.vue` — Root component
- `composables/` — Composables (auto-imported)
- `components/` — Components (auto-registered)
- `pages/` — Routes (auto-generated)
- `utils/` — Utilities (optionally auto-imported)

**Manual Setup (if not auto-configured):**
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

### Server/Client Boundaries

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
export default defineRouteMiddleware((to, from) => {
  // Guard logic
});

// pages/admin.vue
definePageMeta({
  middleware: 'auth',
});
```

### Nuxt-Specific Composables

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
```

---

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

---

**Last updated:** November 2025  
**Maintained by:** Engineering Team
