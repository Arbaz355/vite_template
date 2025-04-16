# Store Module

The `store` directory contains global state management for the application.

## Structure

```
store/
├── actions/          # Action creators or dispatchers
├── reducers/         # State reducers or slices
├── selectors/        # State selectors for accessing store data
├── middleware/       # Custom middleware
├── hooks/            # Store-related hooks
├── types/            # TypeScript types for the store
└── index.ts          # Main store configuration and exports
```

## Domain-Based Organization

For larger applications, consider organizing global state by domain rather than by data type:

```
store/
├── auth/             # Authentication state
│   ├── actions.ts
│   ├── reducers.ts
│   ├── selectors.ts
│   └── types.ts
├── users/            # User profiles and data
├── ui/               # UI state (modals, themes, etc.)
├── entities/         # Normalized application entities
└── app/              # Application-wide state
```

## State Management Options

This structure works with various state management solutions:

### Redux

For complex applications with extensive state management needs:

```tsx
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import uiReducer from './ui/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Context + useReducer

For simpler applications or isolated state domains:

```tsx
// store/auth/context.tsx
import { createContext, useReducer, useContext, ReactNode } from 'react';
import { authReducer, initialState } from './reducer';

const AuthContext = createContext(initialState);
const AuthDispatchContext = createContext<React.Dispatch<any>>(() => null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuthState = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
```

### Modern State Management

For atomic state management with libraries like Zustand:

```tsx
// store/auth/store.ts
import create from 'zustand';
import { AuthState } from './types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: (credentials) => {
    set({ isLoading: true });
    // Login logic...
  },
  logout: () => {
    // Logout logic...
    set({ user: null, isAuthenticated: false });
  },
}));
```

## Hooks

Create custom hooks to access store data, encapsulating the state access logic:

```tsx
// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Selectors

Use selectors to encapsulate state access logic and compute derived data:

```tsx
// store/auth/selectors.ts
import { RootState } from '../index';

export const selectAuthState = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.error;
```

## Guidelines

1. Separate global state from component-local state
2. Keep state normalized to avoid duplication
3. Create meaningful selectors that encapsulate state access logic
4. Minimize direct store access in components
5. Document the shape of your state
6. Consider performance implications of state updates

## Best Practices

1. **State Normalization**: Store entities in a normalized structure
2. **Immutability**: Always update state immutably
3. **Selectors**: Use selectors for accessing and computing derived state
4. **Action Types**: Use constants or enums for action types
5. **Middleware**: Use middleware for side effects and complex logic
6. **DevTools**: Configure DevTools for better debugging
7. **Performance**: Use memoization to prevent unnecessary re-renders

# State Management Architecture

This application uses a robust, scalable state management architecture built around React Context and custom hooks. The architecture is designed for optimal performance, type safety, and developer experience.

## Architecture Overview

The state management system follows a unidirectional data flow pattern with a centralized store:

```
User Interaction → Action → Dispatcher → Reducer → State → UI
```

### Key Components

1. **Store**: Central repository for application state
2. **Reducers**: Pure functions that calculate new state based on current state and actions
3. **Actions**: Events that describe state changes
4. **Selectors**: Functions that extract specific pieces of state
5. **Hooks**: Custom React hooks for accessing state and dispatching actions

## Directory Structure

```
src/store/
├── context.ts         # React context for the store
├── hooks.ts           # Custom hooks for accessing state
├── index.ts           # Public API exports
├── providers.tsx      # StoreProvider component
├── reducers.ts        # Root reducer
├── types.ts           # TypeScript interfaces and types
├── utils.ts           # Helper functions
└── slices/            # State slices by domain
    ├── user.ts        # User authentication state
    ├── ui.ts          # UI state (theme, notifications, etc.)
    └── entities.ts    # Domain entities (normalized)
```

## Core Concepts

### State Organization

State is organized into three main categories:

1. **User State**: Authentication and user profile data
2. **UI State**: Application interface state (theme, notifications, modals, etc.)
3. **Entities State**: Normalized application data organized by entity type

### State Flow

1. Components use hooks to access state and dispatch actions
2. Actions are dispatched to the central store
3. Reducers process actions and calculate new state
4. Components re-render with new state values

## Using the State Management

### Accessing State

```tsx
import { useSelector } from 'src/store/hooks';

function UserProfile() {
  // Access specific state slice
  const user = useSelector(state => state.user);
  
  // Or access specific properties
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  
  // Use with memoization
  const userRoles = useSelector(state => state.user.roles);
  
  return (
    <div>
      {isAuthenticated ? (
        <h1>Welcome, {user.displayName}</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
}
```

### Dispatching Actions

```tsx
import { useDispatch } from 'src/store/hooks';
import { login, logout } from 'src/store/slices/user';

function LoginButton() {
  const dispatch = useDispatch();
  
  const handleLogin = () => {
    dispatch(login({ email: 'user@example.com', password: 'password' }));
  };
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  return (
    <button onClick={handleLogin}>Login</button>
  );
}
```

### Using Entity State

```tsx
import { useEntity } from 'src/store/hooks';
import { entityAdd } from 'src/store/slices/entities';

function TodoList() {
  // Access todos from entities state
  const { byId, allIds, loading } = useEntity<Todo>('todos');
  const dispatch = useDispatch();
  
  const addTodo = (todo) => {
    dispatch(entityAdd({ entityType: 'todos', entity: todo }));
  };
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <ul>
      {allIds.map(id => (
        <li key={id}>{byId[id].title}</li>
      ))}
    </ul>
  );
}
```

### Using UI State

```tsx
import { useUI } from 'src/store/hooks';
import { setTheme, addNotification } from 'src/store/slices/ui';

function ThemeToggle() {
  const { theme } = useUI();
  const dispatch = useDispatch();
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
    
    // Also show a notification
    dispatch(addNotification({
      type: 'success',
      message: `Theme changed to ${newTheme}`,
      autoClose: true,
      duration: 3000
    }));
  };
  
  return (
    <button onClick={toggleTheme}>
      Toggle Theme (Current: {theme})
    </button>
  );
}
```

## Best Practices

1. **Use Selectors**: Always use selectors to access state rather than directly accessing the state object
2. **Memoize Selectors**: For expensive computations, use `useMemoizedSelector`
3. **Normalize Entities**: Store entities in normalized form (byId and allIds)
4. **TypeScript**: Leverage TypeScript for type safety across the state management system
5. **Keep UI State Separate**: Separate UI state from domain data
6. **Use Action Creators**: Always use action creators rather than dispatching plain action objects

## Advanced Features

### Persistence

The state is automatically persisted to localStorage and rehydrated on application reload.

### Middleware

The state management includes a logging middleware for development mode that logs all actions and state changes.

### Error Handling

Actions can include an error flag to indicate failures, and the UI state includes a notifications system for displaying errors to users.

### Optimistic Updates

For better UX, you can perform optimistic updates by updating the local state immediately and then syncing with the server. 