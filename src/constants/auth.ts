/**
 * Authentication Constants
 */
export const AuthStatus = {
  IDLE: 'idle',
  AUTHENTICATING: 'authenticating',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  ERROR: 'error',
} as const;

export const LoginMethod = {
  EMAIL_PASSWORD: 'email_password',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  APPLE: 'apple',
  SSO: 'sso',
} as const;

export const AuthError = {
  INVALID_CREDENTIALS: 'invalid_credentials',
  ACCOUNT_LOCKED: 'account_locked',
  NETWORK_ERROR: 'network_error',
  SESSION_EXPIRED: 'session_expired',
  INSUFFICIENT_PERMISSIONS: 'insufficient_permissions',
  UNKNOWN: 'unknown',
} as const;

// Type exports for TypeScript usage
export type AuthStatusType = (typeof AuthStatus)[keyof typeof AuthStatus];
export type LoginMethodType = (typeof LoginMethod)[keyof typeof LoginMethod];
export type AuthErrorType = (typeof AuthError)[keyof typeof AuthError];

/**
 * Import example:
 * import { AuthStatus, type AuthStatusType } from '@/enums'
 */
