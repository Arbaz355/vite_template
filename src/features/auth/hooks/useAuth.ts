/**
 * Main authentication hook that provides authentication state and methods
 */
import { useCallback } from "react";
import { useDispatch, useSelector } from '../../../store/hooks';
import { logout } from '../../../store/slices/user';

export function useAuth() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.user);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    id: authState.id,
    email: authState.email,
    displayName: authState.displayName,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.loading,
    error: authState.error,
    logout: handleLogout,
  };
}
