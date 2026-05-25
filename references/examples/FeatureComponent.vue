<!-- Feature/Container Component Example: ProductList -->
<!-- src/components/features/products/ProductList.vue -->

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useProductStore } from '@/stores/product-store';
import ProductCard from './ProductCard.vue';
import type { Product } from '@/types';

// ============================================================================
// Store & State
// ============================================================================
const productStore = useProductStore();
const isLoading = ref(false);
const error = ref<string | null>(null);

// ============================================================================
// Data Fetching
// ============================================================================
/**
 * Fetch products from store
 * Handles loading and error states
 */
const fetchProducts = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    await productStore.fetchProducts();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load products';
    // Log to your error reporting service
    console.error('ProductList fetch error:', err);
  } finally {
    isLoading.value = false;
  }
};

// ============================================================================
// Computed Properties
// ============================================================================
const products = computed(() => productStore.products);
const hasProducts = computed(() => products.value.length > 0);

// ============================================================================
// Lifecycle
// ============================================================================
onMounted(() => {
  fetchProducts();
});

// ============================================================================
// Event Handlers
// ============================================================================
const handleProductSelect = (productId: string) => {
  // Navigate or emit event
  // Example: router.push(`/products/${productId}`)
  console.log('Selected product:', productId);
};

const handleRetry = () => {
  fetchProducts();
};
</script>

<template>
  <div class="product-list space-y-4 p-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin text-4xl">⚙️</div>
      <span class="ml-4 text-gray-600">Loading products...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4">
      <p class="text-red-700 font-medium">Error: {{ error }}</p>
      <button
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        @click="handleRetry"
      >
        Retry
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!hasProducts" class="text-center py-12">
      <p class="text-gray-500 text-lg">No products found</p>
      <button
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        @click="handleRetry"
      >
        Refresh
      </button>
    </div>

    <!-- Content -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @select="handleProductSelect"
      />
    </div>
  </div>
</template>

<!--
Key Characteristics of This Feature Component:
1. ✓ Orchestrates data fetching from store
2. ✓ Manages component-level loading/error states
3. ✓ Coordinates multiple child components
4. ✓ Handles all states: loading, error, empty, content
5. ✓ Uses clear section comments for organization
6. ✓ Event delegation to parent via handlers
7. ✓ Reusable via props (could add filters, pagination)
8. ✓ Tailwind utilities composition (no scoped CSS)
9. ✓ Error handling with retry capability
10. ✓ Clean separation: store logic vs UI logic
-->
