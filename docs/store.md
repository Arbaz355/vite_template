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