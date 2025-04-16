/**
 * Main authentication hook that provides authentication state and methods
 */
import { useCallback } from "react";
import { User, AuthState } from "../types";
import { selectAuthState } from "../store/selectors";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { logout } from "../store/actions";

export function useAuth() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuthState);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    logout: handleLogout,
  };
}
