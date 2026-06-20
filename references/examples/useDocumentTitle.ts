// Adaptable Composable Example: useDocumentTitle
// src/composables/useDocumentTitle.ts
//
// Demonstrates an adaptable composable that accepts a plain value, a ref,
// or a getter (MaybeRefOrGetter), normalizing with toRef()/toValue() inside
// a reactive effect. See references/vue-core/adaptable-composables.md.

import { toRef, watch, onScopeDispose } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

/**
 * Keep `document.title` in sync with a reactive (or plain) title source.
 *
 * @param title - Plain string, ref, or getter. The title to apply.
 * @param options.restoreOnUnmount - Restore the previous title on scope dispose.
 * @returns void
 *
 * @example
 * useDocumentTitle('Home')                       // plain value
 * useDocumentTitle(pageTitle)                     // ref
 * useDocumentTitle(() => `${user.value.name}'s profile`) // getter
 */
export const useDocumentTitle = (
  title: MaybeRefOrGetter<string>,
  options: { restoreOnUnmount?: boolean } = {}
): void => {
  // TITLE SYNC — normalize the maybe-reactive input and mirror it to the document
  const previousTitle = document.title
  const titleRef = toRef(title) // ref/getter/plain -> reactive Ref

  watch(
    titleRef,
    (value) => {
      document.title = value
    },
    { immediate: true }
  )

  // CLEANUP — optionally restore the original title when the scope is disposed
  if (options.restoreOnUnmount) {
    onScopeDispose(() => {
      document.title = previousTitle
    })
  }
}

/*
Key Patterns:
1. ✓ Accepts MaybeRefOrGetter<string> — caller may pass value, ref, or getter
2. ✓ toRef() normalizes the input into a reactive source for watch()
3. ✓ (Use toValue() instead when you only need the current value, not a source)
4. ✓ Concern-grouped: TITLE SYNC and CLEANUP each headed by a comment
5. ✓ onScopeDispose for cleanup — works outside component setup too
6. ✓ Small, typed, predictable API with no hidden caller-state mutation
*/
