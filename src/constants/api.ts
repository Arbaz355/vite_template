/**
 * API Constants
 *
 * Define API endpoints and configurations.
 */

/**
 * API endpoints for different environments
 */
export const API_ENDPOINTS = {
  DEVELOPMENT: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  PRODUCTION: import.meta.env.VITE_API_URL || 'https://api.example.com',
  UAT: import.meta.env.VITE_API_URL || 'https://uat-api.example.com',
} as const;

/**
 * API paths for different resources
 */
export const API_PATHS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
  },
} as const;

/**
 * HTTP Methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;
