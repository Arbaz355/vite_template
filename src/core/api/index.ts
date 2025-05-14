/**
 * Central exports for API-related functionality
 */

// Export HTTP client and base query
export { axiosBaseQuery } from './axiosBaseQuery';
export { default as axiosInstance } from './interceptors/axiosInstance';

// Export hooks
export { default as apiHooks } from './hooks';
export type { 
  PaginatedResponse,
  ApiResponse,
  PaginationParams,
  WithId 
} from './hooks';