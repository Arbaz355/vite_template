# Types

This directory contains TypeScript interfaces and type definitions used throughout the application.

## Organization

- **`auth.ts`**: Authentication-related types
- **`user.ts`**: User-related types
- **`api.ts`**: API request and response types
- **`ui.ts`**: UI component props and state types
- **`store.ts`**: State management types
- **`index.ts`**: Exports all types

## Usage

Import types from this directory to ensure type safety:

```typescript
import { UserProfile, ApiResponse } from '../types';

// Type function parameters and return values
function fetchUserProfile(id: string): Promise<ApiResponse<UserProfile>> {
  // Implementation
}

// Type component props
interface UserCardProps {
  user: UserProfile;
  onClick?: (user: UserProfile) => void;
}
```

## Benefits

- Type safety with TypeScript
- Better IntelliSense/autocomplete
- Self-documenting code
- Improved code maintainability
