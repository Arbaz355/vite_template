# API Documentation

The application uses a centralized API client with interceptors for authentication, error handling, and response processing.

## API Client Architecture

The API client is built around a core client that provides:

- HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Request/response interceptors
- Error handling with automatic retry
- Authentication token management
- Timeout handling

### Core API Client

The core API client (`src/core/api/client.ts`) provides a unified interface for all API calls:

```typescript
// Example usage
import api from 'core/api/client';

// GET request
const users = await api.get('/users');

// POST request
const newUser = await api.post('/users', { name: 'John', email: 'john@example.com' });

// PUT request
await api.put('/users/123', { name: 'John Updated' });

// DELETE request
await api.delete('/users/123');
```

## Data Fetching Hooks

The application provides several React hooks for data fetching and manipulation:

### useApi

A hook for fetching data with SWR (stale-while-revalidate) caching strategy.

```typescript
import { useApi } from 'core/api/hooks';

function UserProfile({ userId }) {
  const { data, error, isLoading, status } = useApi(`/users/${userId}`);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <UserDetails user={data} />;
}
```

### useMutation

A hook for creating, updating, or deleting data.

```typescript
import { useMutation } from 'core/api/hooks';

function CreateUserForm() {
  const { mutate, isLoading, error } = useMutation('/users', 'POST');

  const handleSubmit = async (formData) => {
    try {
      const result = await mutate(formData);
      // Success handling
    } catch (error) {
      // Error handling
    }
  };
  
  return <Form onSubmit={handleSubmit} loading={isLoading} error={error} />;
}
```

### usePagination

A hook for working with paginated data.

```typescript
import { usePagination } from 'core/api/hooks';

function UsersList() {
  const { 
    data, 
    error, 
    isLoading,
    pagination: { 
      page, 
      limit, 
      totalPages, 
      goToPage, 
      setPageSize 
    } 
  } = usePagination('/users', { page: 1, limit: 10 });
  
  return (
    <>
      <UserTable users={data?.data} loading={isLoading} error={error} />
      <Pagination 
        currentPage={page} 
        totalPages={totalPages}
        onPageChange={goToPage}
        onPageSizeChange={setPageSize}
      />
    </>
  );
}
```

### useInfiniteData

A hook for infinite scrolling/loading.

```typescript
import { useInfiniteData } from 'core/api/hooks';

function InfiniteUsersList() {
  const { 
    data, 
    error, 
    isLoading, 
    loadMore, 
    hasMore 
  } = useInfiniteData('/users');
  
  return (
    <>
      <UserList users={data} loading={isLoading} error={error} />
      {hasMore && (
        <LoadMoreButton onClick={loadMore} loading={isLoading} />
      )}
    </>
  );
}
```

## Authentication Interceptor

The authentication interceptor (`src/core/api/interceptors/auth.ts`) automatically:

1. Adds authentication tokens to outgoing requests
2. Handles 401 Unauthorized responses
3. Refreshes expired tokens
4. Retries failed requests with the new token

## Error Handling

The API client provides standardized error handling:

- Automatic retry for network errors
- Timeouts for long-running requests
- Structured error responses
- Error categorization (server, network, validation, etc.)

## TypeScript Integration

The API layer is fully typed:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

// Typed API requests
const users = await api.get<ApiResponse<User[]>>('/users');
const user = await api.get<ApiResponse<User>>(`/users/${id}`);
``` 