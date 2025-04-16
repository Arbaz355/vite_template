/**
 * Authentication Guard
 *
 * A component that protects routes requiring authentication.
 * Redirects unauthenticated users to the login page.
 */

import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
  fallback?: ReactNode;
}

/**
 * AuthGuard Component
 *
 * Protects routes that require authentication. If the user is not
 * authenticated, they will be redirected to the login page or a specified route.
 *
 * @param children - The components to render when authenticated
 * @param redirectTo - The path to redirect to when not authenticated (default: /login)
 * @param fallback - Optional component to show while checking authentication state
 */
const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  redirectTo = '/login',
  fallback = null,
}) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  // Show fallback while checking
  if (isLoading) {
    return <>{fallback}</>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default AuthGuard;
