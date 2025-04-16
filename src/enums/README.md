# Enums

This directory contains TypeScript enums used throughout the application.

## Organization

- **`auth.ts`**: Authentication-related enums
- **`user.ts`**: User-related enums
- **`ui.ts`**: UI-related enums
- **`index.ts`**: Exports all enums

## Usage

Import enums from this directory to ensure type safety and consistent values:

```typescript
import { UserRole, AuthStatus } from '../enums';

// Use in functions
function hasAdminAccess(role: UserRole): boolean {
  return role === UserRole.ADMIN;
}

// Use in state
const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.IDLE);
```

## Benefits

- Type safety with TypeScript
- IntelliSense/autocomplete support
- Self-documenting code
- Reduced chance of errors from typos 