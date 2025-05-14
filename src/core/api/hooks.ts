/**
 * API Hooks
 *
 * A collection of hooks for data fetching and API interactions.
 * Uses TanStack Query for efficient data loading with caching, revalidation, and automatic background updates.
 */

import { useState, useCallback } from 'react';
import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import axiosInstance from '@/core/api/interceptors/axiosInstance';

// Interface for entities with IDs
export interface WithId {
  id: string | number;
  [key: string]: unknown;
}

// Interface for API response
export interface ApiResponse<T> {
  data: T[];
  total: number;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: unknown;
}

// Interface for paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Interface for pagination parameters
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

/**
 * Hook for paginated data using TanStack Query
 */
export function usePagination<T>(
  queryKey: string,
  baseUrl: string,
  initialParams: PaginationParams = { page: 1, limit: 10 },
  options?: AxiosRequestConfig
): UseQueryResult<PaginatedResponse<T>> & {
  pagination: {
    page: number;
    limit: number;
    sort?: string;
    order?: 'asc' | 'desc';
    goToPage: (page: number) => void;
    setPageSize: (limit: number) => void;
    setSorting: (sort: string, order?: 'asc' | 'desc') => void;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
} {
  const [params, setParams] = useState<PaginationParams>(initialParams);

  // Build URL with pagination params
  const buildUrl = useCallback(() => {
    const url = baseUrl +
      (baseUrl.includes('?') ? '&' : '?') +
      `page=${params.page}&limit=${params.limit}` +
      (params.sort ? `&sort=${params.sort}` : '') +
      (params.order ? `&order=${params.order}` : '');
    return url;
  }, [baseUrl, params]);

  // Use TanStack Query for data fetching
  const queryOptions: UseQueryOptions<PaginatedResponse<T>, Error, PaginatedResponse<T>> = {
    queryKey: [queryKey, params],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<T>>(buildUrl(), options);
      return {
        data: response.data.data,
        total: response.data.total,
        page: params.page,
        limit: params.limit
      };
    },
    staleTime: 5000, // Data is fresh for 5 seconds
  };

  const query = useQuery<PaginatedResponse<T>, Error>(queryOptions);

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

  const totalPages = query.data ? Math.ceil(query.data.total / params.limit) : 0;
  const hasNextPage = params.page < totalPages;
  const hasPrevPage = params.page > 1;

  return {
    ...query,
    pagination: {
      ...params,
      goToPage,
      setPageSize,
      setSorting,
      totalPages,
      hasNextPage,
      hasPrevPage,
    },
  };
}

/**
 * Hook for infinite loading/scrolling using TanStack Query
 */
export function useInfiniteData<T extends WithId>(
  queryKey: string,
  baseUrl: string,
  options?: AxiosRequestConfig
) {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Use TanStack Query for data fetching
  const queryOptions: UseQueryOptions<PaginatedResponse<T>, Error, PaginatedResponse<T>> = {
    queryKey: [queryKey, page],
    queryFn: async () => {
      if (!hasMore) {
        return {
          data: [],
          total: 0,
          page: page,
          limit: 20
        };
      }
      const url = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}page=${page}&limit=20`;
      const response = await axiosInstance.get<ApiResponse<T>>(url, options);
      return {
        data: response.data.data,
        total: response.data.total,
        page: page,
        limit: 20
      };
    },
    staleTime: 5000, // Data is fresh for 5 seconds
  };

  const query = useQuery<PaginatedResponse<T>, Error>(queryOptions);

  // Handle successful query response
  if (query.data && !query.isLoading) {
    if (query.data.data.length === 0) {
      setHasMore(false);
    } else {
      setAllData((prev) => {
        const newItems = query.data!.data.filter(
          (item) => !prev.some((existing) => existing.id === item.id)
        );
        return [...prev, ...newItems];
      });
    }
  }

  const loadMore = useCallback(() => {
    if (hasMore && !query.isLoading) {
      setPage((p) => p + 1);
    }
  }, [hasMore, query.isLoading]);

  return {
    ...query,
    data: allData,
    hasMore,
    loadMore,
    isLoadingMore: query.isLoading && page > 1,
  };
}

export default {
  usePagination,
  useInfiniteData,
};
