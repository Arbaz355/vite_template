/**
 * Authentication Types
 */

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

export interface PasswordResetData {
  email: string;
}

export interface PasswordUpdateData {
  token: string;
  password: string;
  confirmPassword: string;
}
