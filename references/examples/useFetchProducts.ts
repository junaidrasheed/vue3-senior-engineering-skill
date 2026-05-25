// Composable Example: useFetchProducts
// src/composables/useFetchProducts.ts

import { ref, computed } from 'vue';
import { productService } from '@/services/product-service';
import type { Product } from '@/types';

/**
 * Composable for fetching and managing product data
 *
 * @returns Object with data, loading/error states, and refetch method
 *
 * @example
 * const { data, isLoading, error, fetch } = useFetchProducts();
 * onMounted(() => fetch());
 */
export const useFetchProducts = () => {
  // ============================================================================
  // State
  // ============================================================================
  const data = ref<Product[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // ============================================================================
  // Computed
  // ============================================================================
  const hasError = computed(() => error.value !== null);
  const isEmpty = computed(() => data.value.length === 0);
  const count = computed(() => data.value.length);

  // ============================================================================
  // Methods
  // ============================================================================
  /**
   * Fetch products from API
   */
  const fetch = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      data.value = await productService.getProducts();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch';
      console.error('useFetchProducts error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Reset all state to initial values
   */
  const reset = () => {
    data.value = [];
    error.value = null;
    isLoading.value = false;
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    error.value = null;
  };

  // ============================================================================
  // Return (organized: state, computed, methods)
  // ============================================================================
  return {
    // State
    data,
    isLoading,
    error,
    // Computed
    hasError,
    isEmpty,
    count,
    // Methods
    fetch,
    reset,
    clearError,
  };
};

/*
Key Patterns:
1. ✓ Single responsibility (fetch products)
2. ✓ Stateful logic encapsulation
3. ✓ Clear method naming (fetch, reset, clearError)
4. ✓ Type-safe with TypeScript
5. ✓ No side effects in setup
6. ✓ Mockable for testing
7. ✓ Composition of state + computed + methods
8. ✓ JSDoc documentation
*/
