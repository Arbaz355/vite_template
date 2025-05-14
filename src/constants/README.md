# Constants

This directory contains application-wide constants.

## Organization

- **`app.ts`**: Application-wide configuration constants
- **`api.ts`**: API-related constants, including endpoints and paths
- **`routes.ts`**: Route path constants for consistent navigation
- **`index.ts`**: Exports all constants

## Usage

Import constants from this directory using the index file:

```typescript
import { ROUTES, API_ENDPOINTS, APP_CONFIG } from '@/constants';

// Use in components
<Link to={ROUTES.DASHBOARD}>Dashboard</Link>;

// Use in API calls
const apiUrl = API_ENDPOINTS.DEVELOPMENT;
```

## Benefits

- Single source of truth for fixed values
- Easy to update values in one place
- Eliminates magic strings and numbers
- Improves code maintainability

## Const vs Enum Approach

We use const objects instead of enums for the following benefits:

1. **Tree-shaking**: Constants are better for dead code elimination
2. **Type Safety**: Const assertions (`as const`) provide excellent type safety
3. **Runtime Performance**: No extra JavaScript code generated compared to enums
4. **Better IDE Support**: Better autocomplete and refactoring support
5. **Simpler Debugging**: Values appear as-is in debugger
6. **JSON Serialization**: Easier to serialize/deserialize than enums

Example:

```typescript
// Recommended ✅
export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

// Not Recommended ❌
enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
```