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
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: any;
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
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
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
  timeout?: number;
  withCredentials?: boolean;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  params?: Record<string, any>;
  signal?: AbortSignal;
}

/**
 * Error response from the API
 */
export interface ApiError {
  message: string;
  code: string;
  status: number;
  errors?: Record<string, string[]>;
}

/**
 * Authentication tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * API file upload options
 */
export interface FileUploadOptions extends ApiRequestOptions {
  onProgress?: (progressEvent: { loaded: number; total: number; progress: number }) => void;
}
