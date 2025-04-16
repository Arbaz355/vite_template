/**
 * Authentication Types
 *
 * Define interfaces and types for authentication.
 */

import { UserRole } from '../enums/user';
import { AuthStatus, LoginMethod, AuthErrorType } from '../enums/auth';

/**
 * Authentication state interface
 */
export interface AuthState {
  status: AuthStatus;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  error: AuthError | null;
  isLoading: boolean;
}

/**
 * User interface for authentication
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  avatarUrl?: string;
  roles: UserRole[];
  lastLoginAt?: Date;
  isEmailVerified: boolean;
}

/**
 * Authentication error interface
 */
export interface AuthError {
  type: AuthErrorType;
  message: string;
  code?: string;
  timestamp: number;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  method?: LoginMethod;
}

/**
 * Registration data interface
 */
export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptedTerms: boolean;
  marketingConsent?: boolean;
}

/**
 * Password reset interface
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password reset confirmation interface
 */
export interface PasswordResetConfirmation {
  token: string;
  newPassword: string;
}
