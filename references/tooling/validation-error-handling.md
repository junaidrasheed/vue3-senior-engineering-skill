# Validation & Error Handling

**Reference: Tooling & Conventions | Team-Specific Configuration**

---

## Validation: Zod

**Schema Definition:**
```typescript
import { z } from 'zod';

// Reusable schemas
const emailSchema = z.string().email('Invalid email');
const passwordSchema = z.string().min(8, 'Password must be 8+ chars');

// Domain schemas
const userSchema = z.object({
  id: z.string().uuid(),
  email: emailSchema,
  name: z.string().min(1),
  createdAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
```

**Usage in Composables:**
```typescript
const useUserValidation = () => {
  const validate = (data: unknown) => {
    try {
      return userSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { errors: error.errors };
      }
      throw error;
    }
  };

  return { validate };
};
```

**Location:** `src/validation/schemas.ts` (centralized)

---

## Error Handling

**Pattern: Application-Specific Logger/Reporter**

- Do NOT add custom error classes unless required
- Use the application's existing logger/reporting system
- Log context, not just the error message

```typescript
// src/services/logger.ts (use existing app logger)
const handleApiError = (error: Error, context: string) => {
  logger.error({
    message: error.message,
    context,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });
};

// Usage
try {
  const data = await http.get('/users');
} catch (error) {
  handleApiError(error, 'fetchUsers');
}
```

---

**Related:** [http-api](http-api.md)
