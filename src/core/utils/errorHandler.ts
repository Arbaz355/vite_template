import { AxiosError } from 'axios';

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
  }
}

export const handleApiError = (error: AxiosError): never => {
  const status = error.response?.status;
  const message = error.response?.data?.message || error.message;
  const data = error.response?.data;

  switch (status) {
    case 400:
      throw new ApiError(status, 'Bad Request: Invalid input', data);
    case 401:
      throw new ApiError(status, 'Unauthorized: Please login again', data);
    case 403:
      throw new ApiError(status, 'Forbidden: Access denied', data);
    case 404:
      throw new ApiError(status, 'Not Found: Resource not found', data);
    case 422:
      throw new ApiError(status, 'Validation Error', data);
    case 429:
      throw new ApiError(status, 'Too Many Requests: Please try again later', data);
    case 500:
      throw new ApiError(status, 'Internal Server Error', data);
    default:
      throw new ApiError(status || 0, 'An unexpected error occurred', data);
  }
};
