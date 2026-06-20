# Date/Time & Utilities

**Reference: Tooling & Conventions | Team-Specific Configuration**

---

## Framework: day.js

**Pattern: One Function Per File**

**Location:** `src/utils/`

**Naming:** `{functionName}.ts`

**Example Files:**
```
src/utils/
├── formatDate.ts
├── formatTime.ts
├── addDays.ts
├── isDatePast.ts
├── getDaysDifference.ts
└── parseISODate.ts
```

**File Example:**
```typescript
// src/utils/formatDate.ts
import dayjs from 'dayjs';

/**
 * Format a date to YYYY-MM-DD
 * @param date - Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  return dayjs(date).format('YYYY-MM-DD');
};
```

---

## Global Import Pattern

**Setup:**
```typescript
// src/utils/index.ts
export { formatDate } from './formatDate';
export { formatTime } from './formatTime';
export { addDays } from './addDays';
// ... etc
```

**Usage in Components:**
```typescript
import { formatDate, addDays } from '@/utils';

const formattedDate = formatDate(new Date());
```

---

**Related:** [build-environment](build-environment.md)
