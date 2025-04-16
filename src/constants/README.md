# Constants

This directory contains application-wide constants.

## Organization

- **`app.ts`**: Application-wide configuration constants
- **`api.ts`**: API-related constants, including endpoints and paths
- **`routes.ts`**: Route path constants for consistent navigation
- **`index.ts`**: Exports all constants

## Usage

Import constants from this directory to ensure consistent values across the application:

```typescript
import { ROUTES, API_ENDPOINTS } from '../constants';

// Use in components
<Link to={ROUTES.DASHBOARD}>Dashboard</Link>

// Use in API calls
const apiUrl = API_ENDPOINTS.DEVELOPMENT;
```

## Benefits

- Single source of truth for fixed values
- Easy to update values in one place
- Eliminates magic strings and numbers
- Improves code maintainability 