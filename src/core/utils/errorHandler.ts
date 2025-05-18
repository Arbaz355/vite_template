import { AxiosError } from 'axios';

/**
 * Custom API error class that extends the base Error class.
 * @template T - The type of the error response data
 */
export class ApiError<T = unknown> extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {number} status - The HTTP status code of the error
   * @param {string} message - The error message
   * @param {T} [data] - Optional data associated with the error
   */
  constructor(
    public status: number,
    public message: string,
    public data?: T
  ) {
    super(message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = 'ApiError';
  }
}

/**
 * Handles API errors by converting Axios errors into custom ApiError instances
 * @template T - The type of the error response data
 * @param {AxiosError<T>} error - The Axios error to handle
 * @returns {never} - This function never returns as it always throws
 * @throws {ApiError<T>} - Throws a typed ApiError with appropriate status and message
 *
 * @example
 * ```typescript
 * interface ValidationError {
 *   field: string;
 *   message: string;
 * }
 *
 * try {
 *   await api.post('/users');
 * } catch (error) {
 *   if (error instanceof AxiosError) {
 *     handleApiError<ValidationError>(error);
 *   }
 * }
 * ```
 */
export const handleApiError = <T = unknown>(error: AxiosError<T>): never => {
  const status = error.response?.status;
  const data = error.response?.data;

  switch (status) {
    case 400:
      throw new ApiError<T>(status, 'Bad Request: Invalid input', data);
    case 401:
      throw new ApiError<T>(status, 'Unauthorized: Please login again', data);
    case 403:
      throw new ApiError<T>(status, 'Forbidden: Access denied', data);
    case 404:
      throw new ApiError<T>(status, 'Not Found: Resource not found', data);
    case 422:
      throw new ApiError<T>(status, 'Validation Error', data);
    case 429:
      throw new ApiError<T>(status, 'Too Many Requests: Please try again later', data);
    case 500:
      throw new ApiError<T>(status, 'Internal Server Error', data);
    default:
      throw new ApiError<T>(status || 0, 'An unexpected error occurred', data);
  }
};
