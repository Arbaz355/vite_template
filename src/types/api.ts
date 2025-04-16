/**
 * API Types
 *
 * Define interfaces and types for API requests and responses.
 */

/**
 * Generic API response interface
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: number;
  statusCode: number;
}

/**
 * Pagination parameters interface
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

/**
 * Paginated response interface
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Error response interface
 */
export interface ErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    details?: unknown;
  };
  timestamp: number;
  statusCode: number;
  path?: string;
}

/**
 * Search query interface
 */
export interface SearchQuery extends PaginationParams {
  q: string;
  filters?: Record<string, string | number | boolean | string[]>;
}

/**
 * API request options interface
 */
export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  withAuth?: boolean;
  timeout?: number;
}
