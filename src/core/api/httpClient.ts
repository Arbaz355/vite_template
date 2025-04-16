/**
 * HTTP Client
 *
 * A unified export that provides a single entry point to all API functionality.
 * This file serves as the main export for the API module, combining the
 * core client functionality with hooks for React integration.
 */

import client, {
  get,
  post,
  put,
  patch,
  del as del,
  addRequestInterceptor,
  addResponseInterceptor,
  addErrorInterceptor,
} from './client';

import { useApi, useMutation, usePagination, useInfiniteData } from './hooks';

// Auth interceptor for handling authentication
import { setupAuthInterceptor } from './interceptors/auth';

/**
 * Initialize the API client with default configuration
 * and set up common interceptors
 */
export const initializeApi = (): void => {
  // Set up the auth interceptor for handling tokens
  setupAuthInterceptor();

  // Additional interceptors can be initialized here
};

/**
 * Export all API functionality in a structured way
 */
export default {
  // Core HTTP methods
  client,
  get,
  post,
  put,
  patch,
  delete: del,

  // Interceptor management
  interceptors: {
    addRequest: addRequestInterceptor,
    addResponse: addResponseInterceptor,
    addError: addErrorInterceptor,
  },

  // React hooks
  hooks: {
    useApi,
    useMutation,
    usePagination,
    useInfiniteData,
  },

  // Initialization
  initialize: initializeApi,
};
