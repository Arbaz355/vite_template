# Types

This directory contains TypeScript types and interfaces used throughout the application.

## Structure

- `index.ts` - Re-exports all types from various files for easy importing
- `api.ts` - Types related to API requests, responses, and data fetching
- `analytics.d.ts` - Type declarations for third-party analytics services

## Usage

Types can be imported directly from the top level:

```typescript
import { ApiResponse, PaginatedResponse } from '../types';
```

## Store Types

Note that store-related types are now defined in `src/store/types.ts` and exported through this module's `index.ts`.

## Organization

- **`auth.ts`**: Authentication-related types
- **`user.ts`**: User-related types
- **`ui.ts`**: UI component props and state types
- **`store.ts`**: State management types

## Benefits

- Type safety with TypeScript
- Better IntelliSense/autocomplete
- Self-documenting code
- Improved code maintainability
