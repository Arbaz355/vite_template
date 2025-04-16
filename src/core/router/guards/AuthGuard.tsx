/**
 * Authentication Guard
 *
 * A component that protects routes requiring authentication.
 * Redirects unauthenticated users to the login page.
 */

import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../auth/storage';

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
  const [isChecking, setIsChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const authenticated = isAuthenticated();
        setIsAuth(authenticated);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  // Show fallback while checking
  if (isChecking) {
    return <>{fallback}</>;
  }

  // If not authenticated, redirect to login
  if (!isAuth) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default AuthGuard;
