/**
 * Role Guard
 *
 * A component that protects routes requiring specific user roles.
 * Redirects users without required roles to a specified page.
 */

import React, { ReactNode, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../features/auth/hooks/useAuth';

interface RoleGuardProps {
  children: ReactNode;
  roles: string[];
  redirectTo?: string;
  fallback?: ReactNode;
}

/**
 * RoleGuard Component
 *
 * Protects routes that require specific user roles. If the user doesn't
 * have the required role, they will be redirected.
 *
 * @param children - The components to render when authorized
 * @param roles - Array of allowed roles for this route
 * @param redirectTo - The path to redirect to when not authorized (default: /unauthorized)
 * @param fallback - Optional component to show while checking authorization
 */
const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  roles,
  redirectTo = '/unauthorized',
  fallback = null,
}) => {
  const location = useLocation();
  const { roles: userRoles, isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user has required roles
    const checkAuthorization = () => {
      setIsChecking(true);

      // First check if user is authenticated
      if (!isAuthenticated) {
        setIsAuthorized(false);
        setIsChecking(false);
        return;
      }

      // Check if user has any of the required roles
      const hasRequiredRole = userRoles.some((userRole) => roles.includes(userRole));

      setIsAuthorized(hasRequiredRole);
      setIsChecking(false);
    };

    checkAuthorization();
  }, [roles, userRoles, isAuthenticated]);

  // Show fallback while checking
  if (isChecking) {
    return <>{fallback}</>;
  }

  // If not authorized, redirect to unauthorized page
  if (!isAuthorized) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // If authorized, render the protected content
  return <>{children}</>;
};

export default RoleGuard;
