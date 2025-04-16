/**
 * Authentication Storage
 *
 * Secure storage for authentication tokens with encryption.
 */

import { AuthTokens } from '../../types/api';

// Storage keys
const ACCESS_TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const TOKEN_EXPIRY_KEY = 'auth_token_expiry';

/**
 * Simple encryption for token storage
 * Note: This is not highly secure but offers basic obfuscation
 * For production, consider using a dedicated encryption library
 */
function encrypt(text: string): string {
  // Simple base64 encoding with a timestamp prefix
  // In production, use a proper encryption library
  return btoa(`${Date.now()}-${text}`);
}

/**
 * Decrypt stored tokens
 */
function decrypt(encoded: string): string {
  try {
    // Decode base64 and remove timestamp prefix
    const decoded = atob(encoded);
    const parts = decoded.split('-');
    parts.shift(); // Remove timestamp
    return parts.join('-');
  } catch (error) {
    return '';
  }
}

/**
 * Store authentication tokens securely
 */
export function storeAuthTokens(tokens: AuthTokens): void {
  const { accessToken, refreshToken, expiresIn } = tokens;

  // Calculate expiry time
  const expiryTime = Date.now() + expiresIn * 1000;

  // Encrypt and store tokens
  localStorage.setItem(ACCESS_TOKEN_KEY, encrypt(accessToken));

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, encrypt(refreshToken));
  }

  localStorage.setItem(TOKEN_EXPIRY_KEY, String(expiryTime));
}

/**
 * Get stored authentication tokens
 */
export function getAuthTokens(): AuthTokens | null {
  try {
    const encryptedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const encryptedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const expiryTimeStr = localStorage.getItem(TOKEN_EXPIRY_KEY);

    if (!encryptedAccessToken || !expiryTimeStr) {
      return null;
    }

    const expiryTime = Number(expiryTimeStr);

    // Check if token has expired
    if (Date.now() > expiryTime) {
      // If expired but we have a refresh token, return just that
      if (encryptedRefreshToken) {
        return {
          accessToken: '',
          refreshToken: decrypt(encryptedRefreshToken),
          expiresIn: 0,
        };
      }

      // If completely expired, clear tokens and return null
      clearTokens();
      return null;
    }

    return {
      accessToken: decrypt(encryptedAccessToken),
      refreshToken: encryptedRefreshToken ? decrypt(encryptedRefreshToken) : '',
      expiresIn: Math.floor((expiryTime - Date.now()) / 1000),
    };
  } catch (error) {
    // If there's any error reading tokens, clear them
    clearTokens();
    return null;
  }
}

/**
 * Clear all stored authentication tokens
 */
export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
}

/**
 * Check if user has valid authentication
 */
export function isAuthenticated(): boolean {
  const tokens = getAuthTokens();
  return !!tokens?.accessToken;
}

/**
 * Refresh authentication tokens
 */
export async function refreshTokens(): Promise<AuthTokens | null> {
  try {
    const currentTokens = getAuthTokens();

    if (!currentTokens?.refreshToken) {
      return null;
    }

    // Make API request to refresh token
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: currentTokens.refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const newTokens: AuthTokens = await response.json();

    // Store the new tokens
    storeAuthTokens(newTokens);

    return newTokens;
  } catch (error) {
    clearTokens();
    return null;
  }
}
