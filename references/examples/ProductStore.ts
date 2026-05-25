// Pinia Store Example: Product Store
// src/stores/product-store.ts

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { productService } from '@/services/product-service';
import type { Product } from '@/types';

export const useProductStore = defineStore('product', () => {
  // ============================================================================
  // State
  // ============================================================================
  const products = ref<Product[]>([]);
  const selectedProductId = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // ============================================================================
  // Computed (Getters) - Never store derived data
  // ============================================================================
  const selectedProduct = computed(() =>
    products.value.find((p) => p.id === selectedProductId.value)
  );

  const productCount = computed(() => products.value.length);

  const sortedProducts = computed(() =>
    [...products.value].sort((a, b) => a.name.localeCompare(b.name))
  );

  // ============================================================================
  // Actions
  // ============================================================================
  const fetchProducts = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      products.value = await productService.getProducts();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const selectProduct = (id: string) => {
    selectedProductId.value = id;
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const newProduct = await productService.createProduct(product);
      products.value.push(newProduct);
      return newProduct;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add';
      throw err;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  // ============================================================================
  // Return (organized: state, computed, actions)
  // ============================================================================
  return {
    // State
    products,
    selectedProductId,
    isLoading,
    error,
    // Computed
    selectedProduct,
    productCount,
    sortedProducts,
    // Actions
    fetchProducts,
    selectProduct,
    addProduct,
    clearError,
  };
});

/*
Key Patterns:
1. ✓ Flat state structure
2. ✓ Getters for derived data (never stored)
3. ✓ Async operations in actions
4. ✓ Clear error handling
5. ✓ Type-safe returns
6. ✓ Organized return object
7. ✓ One responsibility per action
*/
