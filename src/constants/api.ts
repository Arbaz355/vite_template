/**
 * API Constants
 *
 * Define API-related constants.
 */

export const API = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://api.example.com',
  TIMEOUT: 30000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout'
    },
    USER: {
      PROFILE: '/user/profile',
      SETTINGS: '/user/settings'
    }
  }
};
