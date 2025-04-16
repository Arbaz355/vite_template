/**
 * Authentication Interceptor
 *
 * Handles authentication token management for API requests.
 * Automatically adds auth tokens to requests and handles token refresh.
 */

import { addRequestInterceptor, addResponseInterceptor, addErrorInterceptor } from '../client';
import { getAuthTokens, refreshTokens, clearTokens } from '../../auth/storage';

const AUTH_HEADER = 'Authorization';
const TOKEN_TYPE = 'Bearer';

/**
 * Setup authentication interceptors for the API client
 */
export function setupAuthInterceptor(): void {
  // Add auth token to outgoing requests
  addRequestInterceptor((url, method, options = {}) => {
    const tokens = getAuthTokens();

    if (tokens?.accessToken) {
      const headers = {
        ...options.headers,
        [AUTH_HEADER]: `${TOKEN_TYPE} ${tokens.accessToken}`,
      };

      return { url, method, options: { ...options, headers } };
    }

    return { url, method, options };
  });

  // Handle 401 Unauthorized errors (token expired)
  addErrorInterceptor(async (error: any) => {
    // If not a 401 error or refresh already attempted, just pass through
    if (error?.status !== 401 || error?.config?.refreshAttempted) {
      throw error;
    }

    try {
      // Try to refresh the token
      const newTokens = await refreshTokens();

      if (!newTokens?.accessToken) {
        throw error;
      }

      // Retry the original request with the new token
      const originalConfig = error.config;
      originalConfig.headers[AUTH_HEADER] = `${TOKEN_TYPE} ${newTokens.accessToken}`;
      originalConfig.refreshAttempted = true;

      // Make the request again (using fetch directly since we need to recreate the request)
      const response = await fetch(`${originalConfig.baseURL || ''}${originalConfig.url}`, {
        method: originalConfig.method,
        headers: originalConfig.headers,
        body: originalConfig.body,
      });

      if (!response.ok) {
        throw error;
      }

      // Parse and return successful response
      const data = await response.json();

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        config: originalConfig,
      };
    } catch (refreshError) {
      // If refresh fails, clear tokens and reject
      clearTokens();
      throw error;
    }
  });
}
