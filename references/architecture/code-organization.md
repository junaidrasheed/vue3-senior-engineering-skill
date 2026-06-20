# Code Organization

**Reference: Architecture | Vue 3 Senior Engineering Standards**

---

## Directory Structure (Feature-Based)

```
src/
├── components/
│   ├── base/              # Atomic, reusable components
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   └── Card.vue
│   ├── common/            # Cross-feature components
│   │   ├── Header.vue
│   │   ├── Sidebar.vue
│   │   └── Footer.vue
│   └── features/          # Feature-specific components
│       ├── products/
│       │   ├── ProductList.vue (container)
│       │   ├── ProductCard.vue (presentational)
│       │   └── ProductDetail.vue (container)
│       └── users/
│           ├── UserProfile.vue (container)
│           └── UserAvatar.vue (presentational)
├── composables/           # Reusable stateful logic
│   ├── useAuth.ts
│   ├── usePagination.ts
│   ├── useFetch.ts
│   └── useForm.ts
├── stores/                # Pinia stores
│   ├── auth-store.ts
│   ├── user-store.ts
│   └── product-store.ts
├── services/              # API & external integrations
│   ├── api.ts             # Axios/fetch instance
│   ├── auth-service.ts
│   └── product-service.ts
├── types/                 # TypeScript types & interfaces
│   ├── common.ts
│   ├── api.ts
│   └── domain.ts
├── utils/                 # Pure utility functions
│   ├── formatting.ts
│   ├── validation.ts
│   └── helpers.ts
├── plugins/               # Vue plugins
│   ├── http-plugin.ts
│   └── notification-plugin.ts
├── middleware/            # Route guards, interceptors
├── constants/             # App constants, config
└── App.vue
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase | `ProductCard.vue`, `UserProfile.vue` |
| **Composables** | camelCase, `use*` prefix | `useAuth.ts`, `usePagination.ts` |
| **Stores** | kebab-case | `auth-store.ts`, `user-store.ts` |
| **Services** | camelCase | `productService.ts`, `authService.ts` |
| **Utilities** | camelCase | `formatDate.ts`, `validateEmail.ts` |
| **Types/Interfaces** | PascalCase | `User`, `Product`, `ApiResponse` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_TIMEOUT` |

---

## Directory Depth Rule

- Avoid more than 5-6 levels of nesting
- Prefer colocating related files
- Keep directory navigation intuitive

---

## File Organization Checklist

```
□ Feature-based structure
□ Naming conventions consistent
□ Clear shared vs feature separation
□ Services layer for API
□ Utilities organized
□ Types centralized
□ README documents structure
□ New devs understand layout
□ Directory depth reasonable
□ Related files colocated
```

---

**Related:** [component-architecture](component-architecture.md) · [code-quality](code-quality.md)
