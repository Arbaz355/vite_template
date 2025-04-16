/**
 * Authentication Feature
 *
 * Public API for the authentication feature.
 * Only expose what is needed by other parts of the application.
 */

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
