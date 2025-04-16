/**
 * API Hooks
 *
 * A collection of hooks for data fetching and API interactions.
 * Uses SWR for efficient data loading with caching, revalidation, and stale-while-revalidate.
 */

import { useState, useCallback, useEffect } from 'react';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import api from './client';
import { ApiRequestOptions, ApiResponse, PaginationParams } from '../../types/api';
import { AsyncStatus } from '../../store/types';

// Interface for entities with IDs
interface WithId {
  id: string | number;
  [key: string]: unknown;
}

/**
 * Custom fetch function for SWR that uses our API client
 */
const fetcher = async <T>(url: string, options?: ApiRequestOptions): Promise<T> => {
  const response = await api.get<ApiResponse<T>>(url, options);
  return response.data.data as T;
};

/**
 * Options for useApi hook
 */
interface UseApiOptions<T> extends SWRConfiguration {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

/**
 * SWR-based hook for data fetching
 */
export function useApi<T>(
  url: string | null,
  options?: UseApiOptions<T> & ApiRequestOptions
): SWRResponse<T, Error> & { status: AsyncStatus } {
  // Extract SWR options and API options
  const { initialData, onSuccess, onError, ...swrOptions } = options || {};

  // Use SWR for data fetching
  const swr = useSWR<T, Error>(url, (fetchUrl: string) => fetcher<T>(fetchUrl, options), {
    ...swrOptions,
    fallbackData: initialData,
    onSuccess,
    onError,
  });

  // Determine loading status
  let status: AsyncStatus = 'idle';
  if (swr.isValidating) status = 'loading';
  else if (swr.error) status = 'failed';
  else if (swr.data) status = 'succeeded';

  return { ...swr, status };
}

/**
 * Hook for mutation operations (create, update, delete)
 */
export function useMutation<T, D extends Record<string, unknown> = Record<string, unknown>>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options?: ApiRequestOptions
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<AsyncStatus>('idle');

  const mutate = useCallback(
    async (mutationData?: D): Promise<ApiResponse<T>> => {
      try {
        setStatus('loading');

        let response: ApiResponse<T>;

        switch (method) {
          case 'POST':
            response = await api.post<T>(url, mutationData, options);
            break;
          case 'PUT':
            response = await api.put<T>(url, mutationData, options);
            break;
          case 'PATCH':
            response = await api.patch<T>(url, mutationData, options);
            break;
          case 'DELETE':
            response = await api.delete<T>(url, options);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        setData(response.data);
        setStatus('succeeded');
        return response;
      } catch (err) {
        const error = err as Error;
        setError(error);
        setStatus('failed');
        throw error;
      }
    },
    [url, method, options]
  );

  return {
    mutate,
    data,
    error,
    status,
    isLoading: status === 'loading',
    isSuccess: status === 'succeeded',
    isError: status === 'failed',
    reset: () => {
      setData(null);
      setError(null);
      setStatus('idle');
    },
  };
}

/**
 * Hook for paginated data
 */
export function usePagination<T>(
  baseUrl: string,
  initialParams: PaginationParams = { page: 1, limit: 10 },
  options?: UseApiOptions<ApiResponse<T[]>> & ApiRequestOptions
) {
  const [params, setParams] = useState<PaginationParams>(initialParams);

  // Build URL with pagination params
  const url =
    baseUrl +
    (baseUrl.includes('?') ? '&' : '?') +
    `page=${params.page}&limit=${params.limit}` +
    (params.sort ? `&sort=${params.sort}` : '') +
    (params.order ? `&order=${params.order}` : '');

  // Use the API hook
  const result = useApi<ApiResponse<T[]>>(url, options);

  // Pagination helpers
  const goToPage = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((limit: number) => {
    setParams((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  const setSorting = useCallback((sort: string, order: 'asc' | 'desc' = 'asc') => {
    setParams((prev) => ({ ...prev, sort, order }));
  }, []);

  return {
    ...result,
    pagination: {
      ...params,
      goToPage,
      setPageSize,
      setSorting,
      totalPages: result.data ? Math.ceil(result.data.data.length / params.limit) : 0,
      hasNextPage: result.data
        ? params.page < Math.ceil(result.data.data.length / params.limit)
        : false,
      hasPrevPage: params.page > 1,
    },
  };
}

/**
 * Hook for infinite loading/scrolling
 */
export function useInfiniteData<T extends WithId>(
  baseUrl: string,
  options?: UseApiOptions<ApiResponse<T[]>> & ApiRequestOptions
) {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Build URL with pagination
  const url = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}page=${page}&limit=20`;

  // Fetch data for current page
  const { data, error, isValidating } = useApi<ApiResponse<T[]>>(hasMore ? url : null, options);

  // Update allData when new data arrives
  useEffect(() => {
    if (data) {
      setAllData((prev) => {
        // Filter out duplicates (by id if available)
        const newItems = data.data.filter(
          (newItem) =>
            !prev.some(
              (existingItem) => newItem.id && existingItem.id && existingItem.id === newItem.id
            )
        );

        return [...prev, ...newItems];
      });

      // Check if we've reached the end
      if (data.data.length === 0) {
        setHasMore(false);
      }
    }
  }, [data]);

  // Function to load more data
  const loadMore = useCallback(() => {
    if (!isValidating && hasMore) {
      setPage((p) => p + 1);
    }
  }, [isValidating, hasMore]);

  // Reset everything
  const reset = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
  }, []);

  return {
    data: allData,
    error,
    isLoading: isValidating,
    loadMore,
    hasMore,
    reset,
  };
}

export default {
  useApi,
  useMutation,
  usePagination,
  useInfiniteData,
};
