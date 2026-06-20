<!-- Base/Atomic Component Example: Button -->
<!-- src/components/base/Button.vue -->
<!-- Demonstrates: template → script → style order, concern-grouped script -->

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || isLoading"
    :type="type"
    :aria-busy="isLoading"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <span v-if="isLoading" class="inline-block mr-2 animate-spin">⚙️</span>

    <!-- Button content -->
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Props for the Button component
 * @property variant - Button style variant
 * @property size - Button size
 * @property disabled - Whether button is disabled
 * @property isLoading - Whether button is in loading state
 * @property type - HTML button type
 */
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  isLoading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  isLoading: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// STYLING — compose the class string from variant/size/disabled state
const buttonClasses = computed(() => {
  const base =
    'inline-flex items-center justify-center rounded font-medium transition-colors duration-200'

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const disabled =
    props.disabled || props.isLoading ? 'opacity-50 cursor-not-allowed' : ''

  return [base, variants[props.variant], sizes[props.size], disabled]
    .filter(Boolean)
    .join(' ')
})

// CLICK — block interaction while disabled/loading, otherwise forward the event
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.isLoading) {
    emit('click', event)
  }
}
</script>

<!--
Key Characteristics of This Base Component:
1. ✓ Block order: template → script → style
2. ✓ Script grouped by concern (STYLING, CLICK), each with a header comment
3. ✓ Single responsibility: renders a styled button
4. ✓ Zero business logic: purely presentational
5. ✓ Fully typed with TypeScript (strict mode)
6. ✓ Handles multiple states: default, loading, disabled
7. ✓ Tailwind CSS utilities (no scoped styles)
8. ✓ Accessibility: aria-busy attribute for screen readers
9. ✓ Event emission for parent interaction
10. ✓ Flexible via slots for content
-->
