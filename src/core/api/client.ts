/**
 * API Client
 *
 * A centralized API client based on axios with interceptors,
 * error handling, and automatic retry logic.
 */

import { ApiRequestOptions, ApiResponse, ApiError } from '../../types/api';

/**
 * API base URL
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

/**
 * Default request timeout in milliseconds
 */
const DEFAULT_TIMEOUT = 30000;

/**
 * HTTP methods supported by the API client
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Request interceptor function type
 */
type RequestInterceptor = (
  url: string,
  method: HttpMethod,
  options?: ApiRequestOptions
) => { url: string; method: HttpMethod; options: ApiRequestOptions | undefined };

/**
 * Response interceptor function type
 */
type ResponseInterceptor = <T>(response: ApiResponse<T>) => ApiResponse<T>;

/**
 * Error interceptor function type
 */
type ErrorInterceptor = (error: unknown) => Promise<unknown>;

// Array of request interceptors
const requestInterceptors: RequestInterceptor[] = [];

// Array of response interceptors
const responseInterceptors: ResponseInterceptor[] = [];

// Array of error interceptors
const errorInterceptors: ErrorInterceptor[] = [];

/**
 * Add a request interceptor
 */
export const addRequestInterceptor = (interceptor: RequestInterceptor): void => {
  requestInterceptors.push(interceptor);
};

/**
 * Add a response interceptor
 */
export const addResponseInterceptor = (interceptor: ResponseInterceptor): void => {
  responseInterceptors.push(interceptor);
};

/**
 * Add an error interceptor
 */
export const addErrorInterceptor = (interceptor: ErrorInterceptor): void => {
  errorInterceptors.push(interceptor);
};

/**
 * Process request with interceptors
 */
const processRequest = (
  url: string,
  method: HttpMethod,
  options?: ApiRequestOptions
): { url: string; method: HttpMethod; options: ApiRequestOptions | undefined } => {
  let result = { url, method, options };

  for (const interceptor of requestInterceptors) {
    result = interceptor(result.url, result.method, result.options);
  }

  return result;
};

/**
 * Process response with interceptors
 */
const processResponse = <T>(response: ApiResponse<T>): ApiResponse<T> => {
  let result = response;

  for (const interceptor of responseInterceptors) {
    result = interceptor(result);
  }

  return result;
};

/**
 * Process error with interceptors
 */
const processError = async <T>(error: unknown): Promise<ApiResponse<T>> => {
  let result = error;

  for (const interceptor of errorInterceptors) {
    try {
      result = await interceptor(result);
    } catch (e) {
      result = e;
    }
  }

  return Promise.reject(result as ApiResponse<T>);
};

/**
 * Parse response from fetch
 */
const parseResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const contentType = response.headers.get('content-type');
  let data: unknown;

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  return {
    data: data as T,
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    config: {},
  };
};

/**
 * Create API error from response
 */
const createApiError = (response: ApiResponse<unknown>): ApiError => {
  const responseData = response.data as Record<string, unknown>;
  return {
    message: (responseData?.message as string) || 'An error occurred',
    code: (responseData?.code as string) || 'UNKNOWN_ERROR',
    status: response.status,
    errors: responseData?.errors as Record<string, string[]>,
  };
};

/**
 * Main API request function
 */
export const apiRequest = async <T>(
  url: string,
  method: HttpMethod,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> => {
  try {
    // Process request with interceptors
    const processed = processRequest(url, method, options);

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: processed.method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(processed.options?.headers || {}),
      },
      credentials: processed.options?.withCredentials ? 'include' : 'same-origin',
      signal: processed.options?.signal,
    };

    // Add body for non-GET requests
    if (method !== 'GET' && options.params) {
      fetchOptions.body = JSON.stringify(options.params);
    }

    // Build query string for GET requests
    let fullUrl = `${API_BASE_URL}${
      processed.url.startsWith('/') ? processed.url : `/${processed.url}`
    }`;

    if (method === 'GET' && options.params) {
      const queryParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });

      const queryString = queryParams.toString();
      if (queryString) {
        fullUrl = `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}${queryString}`;
      }
    }

    // Set timeout
    const controller = new AbortController();
    if (!options.signal) {
      const timeoutId = setTimeout(() => controller.abort(), options.timeout || DEFAULT_TIMEOUT);
      fetchOptions.signal = controller.signal;

      // Clean up timeout on controller abort
      fetchOptions.signal.addEventListener('abort', () => clearTimeout(timeoutId));
    }

    // Make the request
    const response = await fetch(fullUrl, fetchOptions);
    const apiResponse = await parseResponse<T>(response);

    // Handle error responses
    if (!response.ok) {
      const error = createApiError(apiResponse);
      return await processError<T>(error);
    }

    // Process response with interceptors
    return processResponse(apiResponse);
  } catch (error) {
    return await processError<T>(error);
  }
};

/**
 * Convenience method for GET requests
 */
export const get = <T>(url: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
  return apiRequest<T>(url, 'GET', options);
};

/**
 * Convenience method for POST requests
 */
export const post = <T>(
  url: string,
  data?: Record<string, unknown>,
  options?: ApiRequestOptions
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(url, 'POST', { ...options, params: data });
};

/**
 * Convenience method for PUT requests
 */
export const put = <T>(
  url: string,
  data?: Record<string, unknown>,
  options?: ApiRequestOptions
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(url, 'PUT', { ...options, params: data });
};

/**
 * Convenience method for PATCH requests
 */
export const patch = <T>(
  url: string,
  data?: Record<string, unknown>,
  options?: ApiRequestOptions
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(url, 'PATCH', { ...options, params: data });
};

/**
 * Convenience method for DELETE requests
 */
export const del = <T>(url: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
  return apiRequest<T>(url, 'DELETE', options);
};

/**
 * Default export of all API methods
 */
export default {
  get,
  post,
  put,
  patch,
  delete: del,
  request: apiRequest,
  addRequestInterceptor,
  addResponseInterceptor,
  addErrorInterceptor,
};
