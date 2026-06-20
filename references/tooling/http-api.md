# HTTP & API Integration

**Reference: Tooling & Conventions | Team-Specific Configuration**

---

## Client: Fetch API (Not Axios)

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
  const buildUrl = (path: string, params?: Record<string, any>): string => {
    const url = new URL(path, baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  };

  const request = async <T>(
    path: string,
    method: string,
    body?: any,
    config?: FetchOptions
  ): Promise<ApiResponse<T>> => {
    const response = await fetch(buildUrl(path, config?.params), {
      method,
      headers: { 'Content-Type': 'application/json', ...config?.headers },
      body: body ? JSON.stringify(transformRequest(body)) : undefined,
      ...config,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new ApiError(data.message || 'Request failed', response.status, data);
    }

    return {
      data: transformResponse<T>(data),
      status: response.status,
      headers: response.headers,
    };
  };

  return {
    get: <T>(path: string, config?: FetchOptions) => request<T>(path, 'GET', undefined, config),
    post: <T>(path: string, body?: any, config?: FetchOptions) => request<T>(path, 'POST', body, config),
    put: <T>(path: string, body?: any, config?: FetchOptions) => request<T>(path, 'PUT', body, config),
    delete: <T>(path: string, config?: FetchOptions) => request<T>(path, 'DELETE', undefined, config),
  };
};

export const http = createHttpClient(import.meta.env.VITE_API_BASE_URL);
```

---

## Request/Response Transformation

**Request Transformation (camelCase → snake_case):**
```typescript
const transformRequest = (data: Record<string, any>) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    acc[toSnakeCase(key)] = value;
    return acc;
  }, {});
};
```

**Response Transformation (snake_case → camelCase):**
```typescript
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

---

## Injection Pattern

**Plugin Setup:**
```typescript
// src/plugins/http-plugin.ts
import { App } from 'vue';
import { http } from '@/services/http';

export const httpPlugin = (app: App) => {
  app.provide('$http', http);
  app.config.globalProperties.$http = http; // optional, for Options API
};

// main.ts
import { httpPlugin } from '@/plugins/http-plugin';
app.use(httpPlugin);
```

**Usage:**
```typescript
// Via inject (Composition API, preferred)
import { inject } from 'vue';
const http = inject('$http');

// Or direct import (also acceptable)
import { http } from '@/services/http';
```

> Prefer typed `provide/inject` with an `InjectionKey` — see `references/vue-core/provide-inject-and-refs.md`.

---

## Service Layer Pattern

Wrap endpoints in a typed service module; components/stores call the service, never `http` directly.

```typescript
// src/services/product-service.ts
import { http } from './http';
import type { Product } from '@/types';

export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await http.get<Product[]>('/products');
    return response.data;
  },
  async getProduct(id: string): Promise<Product> {
    const response = await http.get<Product>(`/products/${id}`);
    return response.data;
  },
  async createProduct(data: Omit<Product, 'id'>): Promise<Product> {
    const response = await http.post<Product>('/products', data);
    return response.data;
  },
  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const response = await http.put<Product>(`/products/${id}`, data);
    return response.data;
  },
  async deleteProduct(id: string): Promise<void> {
    await http.delete(`/products/${id}`);
  },
};
```

---

**Related:** [validation-error-handling](validation-error-handling.md) · [nuxt-patterns](nuxt-patterns.md)
