import { create } from 'zustand';
import storage from '@/core/storage';
import getExpireTime from '@/core/utils/expireTime';

// Constants
const ACCESS_TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const COOKIES_EXPIRE_TIME = 60; // 60 minutes

// Cookie options
const cookieOptions = {
  secure: true,
  sameSite: 'strict' as const,
  expires: getExpireTime(COOKIES_EXPIRE_TIME),
  path: '/',
};

// Store state type
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setTokens: (access: string, refresh: string) => void;
  clearTokens: () => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
}

// Create auth store
const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  accessToken: storage.cookie.get<string>(ACCESS_TOKEN_KEY),
  refreshToken: storage.cookie.get<string>(REFRESH_TOKEN_KEY),
  isAuthenticated: !!storage.cookie.get<string>(ACCESS_TOKEN_KEY),

  // Set both tokens
  setTokens: (access: string, refresh: string) => {
    // Store in cookies
    storage.cookie.set(ACCESS_TOKEN_KEY, access, cookieOptions);
    storage.cookie.set(REFRESH_TOKEN_KEY, refresh, cookieOptions);

    // Update state
    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: true,
    });
  },

  // Clear both tokens
  clearTokens: () => {
    // Remove from cookies
    storage.cookie.remove(ACCESS_TOKEN_KEY, { path: '/' });
    storage.cookie.remove(REFRESH_TOKEN_KEY, { path: '/' });

    // Update state
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  // Get access token (from state or cookie)
  getAccessToken: () => {
    const state = get();
    if (state.accessToken) return state.accessToken;
    
    const token = storage.cookie.get<string>(ACCESS_TOKEN_KEY);
    if (token) {
      set({ accessToken: token, isAuthenticated: true });
    }
    return token;
  },

  // Get refresh token (from state or cookie)
  getRefreshToken: () => {
    const state = get();
    if (state.refreshToken) return state.refreshToken;
    
    const token = storage.cookie.get<string>(REFRESH_TOKEN_KEY);
    if (token) {
      set({ refreshToken: token });
    }
    return token;
  },
}));

export default useAuthStore;