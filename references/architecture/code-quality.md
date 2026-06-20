# Code Quality Standards

**Reference: Architecture | Vue 3 Senior Engineering Standards**

---

## TypeScript

- **Mode:** Strict (`tsconfig.json: "strict": true`)
- **No `any` types** (except unavoidable legacy code)
- **Explicit return types** on functions
- **Proper typing** of props, emits, generics
- **Use discriminated unions** for complex types

> Vue-specific TS pitfalls: typed template refs, `defineExpose`, and typed `InjectionKey` are covered in `references/vue-core/provide-inject-and-refs.md`; reactivity typing (`shallowRef`, `toValue`) in `references/vue-core/reactivity.md`.

---

## Formatting & Linting

- **Prettier:** Enforced (not ESLint for formatting)
- **No semicolons**, single quotes
- **Print width:** 80-100 characters
- **Trailing comma:** ES5 (preserve compatibility)

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5",
  "arrowParens": "always"
}
```

---

## Code Comments — explain "why", not "what"

```typescript
// ✗ Avoid (obvious from code)
const isActive = true; // Set isActive to true

// ✓ Good (explains reasoning)
// Cache products for 5 minutes to reduce API calls
const cacheTimeMs = 5 * 60 * 1000;
```

---

## Documentation

- **Components:** JSDoc for public API
- **Composables:** Clear purpose, params, returns documented
- **Complex logic:** Inline comments explaining "why", not "what"
- **Stores:** Document state shape, action purposes
- **README:** Document project structure for new developers

```typescript
/**
 * Format a date to human-readable format
 * @param date - Date to format
 * @param locale - Optional locale (defaults to 'en-US')
 * @returns Formatted date string
 * @example
 * formatDate(new Date(), 'en-US') // "Monday, January 1, 2024"
 */
export const formatDate = (date: Date, locale = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
```

---

## Code Review Checklist

- [ ] Follows naming conventions
- [ ] Single responsibility maintained
- [ ] Props/returns properly typed
- [ ] No prop drilling (max 3 levels)
- [ ] Proper separation of concerns
- [ ] Accessibility requirements met
- [ ] Performance considerations addressed
- [ ] Testability standards met
- [ ] Documentation complete
- [ ] No unnecessary dependencies added

---

**Related:** [code-organization](code-organization.md) · [anti-patterns](anti-patterns.md)
