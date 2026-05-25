<!-- Base/Atomic Component Example: Button -->
<!-- src/components/base/Button.vue -->

<script setup lang="ts">
import { computed } from 'vue';

/**
 * Props for the Button component
 * @property variant - Button style variant
 * @property size - Button size
 * @property disabled - Whether button is disabled
 * @property isLoading - Whether button is in loading state
 * @property type - HTML button type
 */
interface Props {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  isLoading: false,
  type: 'button',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// ============================================================================
// Computed: Button Classes
// ============================================================================
const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center rounded font-medium transition-colors duration-200';
  
  // Variant styles
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  };

  // Size styles
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Disabled state
  const disabled = props.disabled || props.isLoading ? 'opacity-50 cursor-not-allowed' : '';

  return [
    base,
    variants[props.variant],
    sizes[props.size],
    disabled,
  ].filter(Boolean).join(' ');
});

// ============================================================================
// Methods
// ============================================================================
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.isLoading) {
    emit('click', event);
  }
};
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || isLoading"
    :type="type"
    :aria-busy="isLoading"
    @click="handleClick"
  >
    <!-- Loading spinner (if needed) -->
    <span v-if="isLoading" class="inline-block mr-2 animate-spin">⚙️</span>
    
    <!-- Button content -->
    <slot />
  </button>
</template>

<!-- 
Key Characteristics of This Base Component:
1. ✓ Single responsibility: renders a styled button
2. ✓ Zero business logic: purely presentational
3. ✓ Fully typed with TypeScript (strict mode)
4. ✓ Handles multiple states: default, loading, disabled
5. ✓ Tailwind CSS utilities (no scoped styles)
6. ✓ Accessibility: aria-busy attribute for screen readers
7. ✓ Composable classes via computed properties
8. ✓ Clear documentation via JSDoc comments
9. ✓ Event emission for parent interaction
10. ✓ Flexible via slots for content
-->
