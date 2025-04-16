/**
 * Authentication Enums
 *
 * Define enums related to authentication.
 */

/**
 * Authentication status
 */
export enum AuthStatus {
  IDLE = 'idle',
  AUTHENTICATING = 'authenticating',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  ERROR = 'error',
}

/**
 * Login methods
 */
export enum LoginMethod {
  EMAIL_PASSWORD = 'email_password',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
  SSO = 'sso',
}

/**
 * Auth error types
 */
export enum AuthErrorType {
  INVALID_CREDENTIALS = 'invalid_credentials',
  ACCOUNT_LOCKED = 'account_locked',
  NETWORK_ERROR = 'network_error',
  SESSION_EXPIRED = 'session_expired',
  INSUFFICIENT_PERMISSIONS = 'insufficient_permissions',
  UNKNOWN = 'unknown',
}
