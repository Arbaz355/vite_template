# Features Module

The `features` directory follows a domain-driven design approach where each feature is isolated as a self-contained unit.

## Structure

Each feature should have its own directory with the following structure:

```
feature-name/
├── api/              # Feature-specific API requests
├── components/       # UI components used only in this feature
├── hooks/            # Feature-specific custom hooks
├── store/            # Feature state management (context, reducers, etc.)
├── types/            # TypeScript interfaces and types for this feature
├── utils/            # Feature-specific utility functions
└── index.ts          # Public API of the feature
```

## Guidelines

1. Features should be **self-contained** and have minimal dependencies on other features
2. Communication between features should happen through the application store or events
3. Common UI elements used across features should be moved to `shared/components`
4. Each feature should expose a clear public API through its index.ts file

## Example: Authentication Feature

The Authentication feature demonstrates the structure and principles:

### Public API (`auth/index.ts`)

```typescript
// Components
export { default as LoginForm } from "./components/LoginForm";
export { default as SignupForm } from "./components/SignupForm";
export { default as ForgotPasswordForm } from "./components/ForgotPasswordForm";
export { default as AuthGuard } from "./components/AuthGuard";

// Hooks
export { useAuth } from "./hooks/useAuth";
export { useLogin } from "./hooks/useLogin";
export { useSignup } from "./hooks/useSignup";
export { useLogout } from "./hooks/useLogout";
export { usePasswordReset } from "./hooks/usePasswordReset";

// Types
export type { User, AuthState, LoginCredentials, SignupData } from "./types";

// Store exports (if needed by other features)
export {
  selectIsAuthenticated,
  selectCurrentUser,
  selectAuthError,
} from "./store/selectors";
```

### Types (`auth/types/index.ts`)

```typescript
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  agreeToTerms: boolean;
}
```

### Hooks (`auth/hooks/useAuth.ts`)

```typescript
export function useAuth() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuthState);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    logout: handleLogout,
  };
}
```

## Common Features

- Authentication
- User Profile
- Dashboard
- Products/Inventory
- Checkout/Payment
- Admin/Management
- Notifications
- Search
- Settings

## Best Practices

1. **Public API**: Only expose what other parts of the application actually need
2. **State Isolation**: Keep feature state isolated unless explicitly shared
3. **Clear Boundaries**: Maintain clear boundaries between features
4. **Consistent Structure**: Follow the same structure across all features
5. **Test by Feature**: Organize tests to match the feature structure 