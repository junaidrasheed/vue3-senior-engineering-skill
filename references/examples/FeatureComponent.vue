<!-- Feature/Container Component Example: ProductList -->
<!-- src/components/features/products/ProductList.vue -->
<!-- Demonstrates: template → script → style order, multi-concern grouped script -->

<template>
  <div class="product-list space-y-4 p-6">
    <!-- Search -->
    <div>
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search products..."
        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

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
    <div v-else-if="!hasResults" class="text-center py-12">
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
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @select="handleProductSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product-store'
import ProductCard from './ProductCard.vue'

// PRODUCT DATA — fetch from the store and track loading/error state
const productStore = useProductStore()
const isLoading = ref(false)
const error = ref<string | null>(null)
const products = computed(() => productStore.products)

/**
 * Fetch products from the store, managing loading and error states.
 */
const fetchProducts = async () => {
  isLoading.value = true
  error.value = null
  try {
    await productStore.fetchProducts()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load products'
    logger.error('ProductList fetch failed', { err })
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchProducts)

// SEARCH & FILTER — narrow the list by the search query
const searchQuery = ref('')
const filteredProducts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return products.value
  return products.value.filter((p) => p.name.toLowerCase().includes(q))
})
const hasResults = computed(() => filteredProducts.value.length > 0)

// SELECTION — navigate to the chosen product's detail page
const router = useRouter()
const handleProductSelect = (productId: string) => {
  router.push(`/products/${productId}`)
}

// RETRY — clear the query and refetch
const handleRetry = () => {
  searchQuery.value = ''
  fetchProducts()
}
</script>

<!--
Key Characteristics of This Feature Component:
1. ✓ Block order: template → script → style
2. ✓ Script grouped by concern: PRODUCT DATA, SEARCH & FILTER, SELECTION, RETRY
3. ✓ Each concern owns its state + computed + lifecycle + methods together
4. ✓ Orchestrates data fetching from the store
5. ✓ Handles all states: loading, error, empty, content
6. ✓ Errors routed through the app logger (no custom error classes)
7. ✓ Coordinates child components; events delegated via handlers
8. ✓ Tailwind utilities composition (no scoped CSS)
9. ✓ Clean separation: store/data logic vs UI logic
10. ✓ Each concern header is a candidate composable when it grows
     (e.g. SEARCH & FILTER -> useProductFilter())
-->
