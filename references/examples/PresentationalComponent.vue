<!-- Presentational Component Example: ProductCard -->
<!-- src/components/features/products/ProductCard.vue -->
<!-- Demonstrates: template → script → style order, concern-grouped script -->

<template>
  <div
    class="product-card border border-gray-200 rounded-lg overflow-hidden
           hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    role="article"
    :aria-label="`Product: ${product.name}`"
    tabindex="0"
    @click="handleSelect"
    @keydown.enter="handleSelect"
    @keydown.space="handleSelect"
  >
    <!-- Image Section -->
    <div class="relative h-48 bg-gray-100 overflow-hidden">
      <img
        :src="product.image"
        :alt="`${product.name} image`"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
      />
      <!-- Discount Badge -->
      <div
        v-if="isDiscounted"
        class="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
      >
        -{{ product.discount }}%
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-4 space-y-3">
      <!-- Name -->
      <h3 class="font-bold text-lg text-gray-900 line-clamp-2">
        {{ product.name }}
      </h3>

      <!-- Description -->
      <p v-if="product.description" class="text-sm text-gray-600 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Pricing -->
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-bold text-gray-900">{{ formattedPrice }}</span>
        <span v-if="discountedPrice" class="text-lg text-gray-400 line-through">
          {{ discountedPrice }}
        </span>
      </div>

      <!-- Stock Status -->
      <div class="flex items-center gap-2">
        <div :class="['w-3 h-3 rounded-full', product.inStock ? 'bg-green-500' : 'bg-gray-300']" />
        <span :class="product.inStock ? 'text-green-600' : 'text-gray-600'">
          {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
        </span>
      </div>

      <!-- Rating (if available) -->
      <div v-if="product.rating" class="flex items-center gap-1">
        <span class="text-yellow-400">⭐</span>
        <span class="text-sm text-gray-600">{{ product.rating }} / 5</span>
      </div>

      <!-- Select Button -->
      <button
        class="w-full py-2 px-3 rounded bg-blue-600 text-white font-medium
               hover:bg-blue-700 transition-colors duration-200"
        :disabled="!product.inStock"
        @click="handleSelect"
      >
        {{ product.inStock ? 'View Details' : 'Out of Stock' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types'

/**
 * Props for ProductCard
 * @property product - Product data to display
 */
interface Props {
  product: Product
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [id: string]
}>()

// PRICING — format the price and derive discount display
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

const formattedPrice = computed(() => formatCurrency(props.product.price))

const isDiscounted = computed(
  () => !!props.product.discount && props.product.discount > 0
)

const discountedPrice = computed(() => {
  if (!props.product.discount) return null
  const discountAmount = props.product.price * (props.product.discount / 100)
  return formatCurrency(props.product.price - discountAmount)
})

// SELECTION — notify the parent which product was chosen
const handleSelect = () => {
  emit('select', props.product.id)
}
</script>

<!--
Key Characteristics of This Presentational Component:
1. ✓ Block order: template → script → style
2. ✓ Script grouped by concern (PRICING, SELECTION), each with a header comment
3. ✓ Pure function of props (no side effects)
4. ✓ All state derived from props via computed
5. ✓ Emits events for parent coordination
6. ✓ Zero API calls or store access
7. ✓ Fully typed TypeScript (strict mode)
8. ✓ Accessibility: ARIA labels, keyboard navigation
9. ✓ Tailwind CSS utilities (no scoped styles)
10. ✓ Easy to test (predictable inputs/outputs)
-->
