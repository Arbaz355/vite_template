import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import useAuthStore from '@/store/zustand/useAuthStore';
import { handleApiError } from '../../utils/errorHandler';

/**
 * API base URL
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

/**
 * Default request timeout in milliseconds
 */
const DEFAULT_TIMEOUT = 30000;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 and refresh token
    if (error.response?.status === 401 && originalRequest && !originalRequest.headers._retry) {
      originalRequest.headers._retry = true;

      try {
        const refreshToken = useAuthStore.getState().getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Attempt to refresh tokens
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        // Update tokens in auth store
        useAuthStore.getState().setTokens(
          response.data.accessToken,
          response.data.refreshToken
        );

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Clear tokens and redirect to login
        useAuthStore.getState().clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(handleApiError(error));
  }
);

// Global error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors (you can integrate with your logging service)
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default axiosInstance;
