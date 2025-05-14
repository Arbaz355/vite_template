import { AxiosError } from 'axios';
import axiosInstance from '@/core/api/interceptors/axiosInstance';
import { AxiosRequestConfig } from 'axios';

// Interface extending AxiosRequestConfig to ensure URL is required
interface AxiosBaseQueryArgs extends AxiosRequestConfig {
  url: string;
}

// Interface defining the structure of error responses
interface AxiosBaseQueryError {
  status?: number; // HTTP status code
  data: unknown; // Error response data
}

/**
 * Creates a base query function for making HTTP requests using axios
 * This can be used with RTK Query or standalone
 *
 * @param baseUrl - Optional base URL to prepend to all requests
 * @returns A function that handles HTTP requests and error responses
 */
const axiosBaseQuery =
  <T = unknown>({ baseUrl }: { baseUrl?: string } = {}) =>
  async ({
    url,
    method,
    data,
    params,
    headers,
  }: AxiosBaseQueryArgs): Promise<{ data: T } | { error: AxiosBaseQueryError }> => {
    try {
      // Make the HTTP request using axiosInstance with provided configuration
      const result = await axiosInstance<T>({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      // Return successful response data
      return { data: result };
    } catch (axiosError) {
      // Handle and transform axios errors into a consistent error format
      const err = axiosError as AxiosError<AxiosBaseQueryError>;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export { axiosBaseQuery };
