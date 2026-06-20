# Testing Stack

**Reference: Tooling & Conventions | Team-Specific Configuration**

---

## Framework: Vitest + Vue Test Utils

**File Naming:** `{ComponentName}.spec.ts` or `{functionName}.spec.ts`

**Location:**
- Component specs: `src/components/__tests__/{feature}/`
- Composable specs: `src/composables/__tests__/`
- Utility specs: `src/utils/__tests__/`
- Store specs: `src/stores/__tests__/`

---

## Pattern: Factory Functions

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

---

## Test File Structure

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

---

## Conventions

- **Coverage Target:** 80%+ overall
- Prefer black-box assertions over implementation details
- Use `flushPromises()` for async flows
- Fresh Pinia per test: `setActivePinia(createPinia())`
- E2E: Playwright recommended for critical flows
- Avoid snapshot-only tests (they pass while functionality is broken)

> Strategy & coverage targets: `references/architecture/testing.md`

---

## Worked Examples

### Component test

```typescript
// src/components/__tests__/features/ProductCard.spec.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductCard from '@/components/features/ProductCard.vue';
import type { Product } from '@/types';

// Factories
const createProductMock = (overrides?: Partial<Product>): Product => ({
  id: '1',
  name: 'Test Product',
  price: 99.99,
  description: 'A test product',
  ...overrides,
});

describe('ProductCard', () => {
  describe('rendering', () => {
    it('renders product name and price', () => {
      const product = createProductMock();
      const wrapper = mount(ProductCard, { props: { product } });
      expect(wrapper.text()).toContain(product.name);
    });

    it('renders description when provided', () => {
      const product = createProductMock({ description: 'Custom description' });
      const wrapper = mount(ProductCard, { props: { product } });
      expect(wrapper.text()).toContain('Custom description');
    });
  });

  describe('interactions', () => {
    it('emits select event when clicked', async () => {
      const product = createProductMock();
      const wrapper = mount(ProductCard, { props: { product } });
      await wrapper.find('[data-testid="product-card"]').trigger('click');
      expect(wrapper.emitted('select')?.[0]).toEqual([product.id]);
    });
  });

  describe('edge cases', () => {
    it('handles missing description gracefully', () => {
      const product = createProductMock({ description: undefined });
      const wrapper = mount(ProductCard, { props: { product } });
      expect(wrapper.find('[data-testid="description"]').exists()).toBe(false);
    });
  });
});
```

### Composable test

```typescript
// src/composables/__tests__/useFetchProducts.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFetchProducts } from '@/composables/useFetchProducts';
import * as productService from '@/services/product-service';

vi.mock('@/services/product-service');

describe('useFetchProducts', () => {
  beforeEach(() => vi.clearAllMocks());

  it('fetches products on demand', async () => {
    const mockProducts = [{ id: '1', name: 'Product 1' }];
    vi.spyOn(productService, 'getProducts').mockResolvedValue(mockProducts);

    const { data, fetch } = useFetchProducts();
    await fetch();

    expect(data.value).toEqual(mockProducts);
  });

  it('handles fetch errors', async () => {
    vi.spyOn(productService, 'getProducts').mockRejectedValue(new Error('API error'));

    const { error, fetch } = useFetchProducts();
    await fetch();

    expect(error.value).toBe('API error');
  });
});
```

### Store test

```typescript
// src/stores/__tests__/product-store.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProductStore } from '@/stores/product-store';
import * as productService from '@/services/product-service';

vi.mock('@/services/product-service');

describe('Product Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // fresh Pinia per test
    vi.clearAllMocks();
  });

  it('fetches and stores products', async () => {
    const mockProducts = [{ id: '1', name: 'Product' }];
    vi.spyOn(productService, 'getProducts').mockResolvedValue(mockProducts);

    const store = useProductStore();
    await store.fetchProducts();

    expect(store.products).toEqual(mockProducts);
  });
});
```

---

**Related:** [http-api](http-api.md) · [validation-error-handling](validation-error-handling.md)
