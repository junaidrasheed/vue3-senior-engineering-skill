# Build & Environment

**Reference: Tooling & Conventions | Team-Specific Configuration**

---

## Build Tool: Vite

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

---

## Environment Variables

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

## Gotcha: Dynamic Component Registration

`require.context` does not exist in Vite. Use `import.meta.glob` for auto-registration:

```typescript
const modules = import.meta.glob('./components/*.vue', { eager: true });
```

---

**Related:** [nuxt-patterns](nuxt-patterns.md)
