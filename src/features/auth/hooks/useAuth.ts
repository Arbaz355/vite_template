/**
 * Main authentication hook that provides authentication state and methods
 */
import { useCallback } from "react";
import { useUser } from '../../../store';

export function useAuth() {
  const { id, email, displayName, isAuthenticated, loading, error, clearUser } = useUser();

  const handleLogout = useCallback(() => {
    clearUser();
  }, [clearUser]);

  return {
    id,
    email,
    displayName,
    isAuthenticated,
    isLoading: loading,
    error,
    logout: handleLogout,
  };
}
