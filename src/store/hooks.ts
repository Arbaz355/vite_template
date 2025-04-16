/**
 * State Management Hooks
 *
 * This file provides custom hooks for accessing and updating state.
 */

import { useContext, useCallback, useMemo } from 'react';
import { StoreContext } from './context';
import { Action, AppState, Selector } from './types';
import { createSelector } from './utils';

/**
 * Hook to access the entire store state and dispatch
 */
export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return context;
}

/**
 * Hook to access a specific slice of state using a selector
 */
export function useSelector<T>(selector: Selector<T>) {
  const { state } = useStore();
  return selector(state);
}

/**
 * Hook to create and memoize a selector
 */
export function useMemoizedSelector<T>(selectorFn: (state: AppState) => T, deps: unknown[] = []) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createSelector(selectorFn), deps);
}

/**
 * Hook to get the dispatch function
 */
export function useDispatch() {
  const { dispatch } = useStore();
  return dispatch;
}

/**
 * Hook to create a memoized action creator
 */
export function useAction<T>(actionCreator: (payload: T) => Action<T>) {
  const dispatch = useDispatch();

  return useCallback((payload: T) => dispatch(actionCreator(payload)), [dispatch, actionCreator]);
}

/**
 * Hook for user state
 */
export function useUser() {
  return useSelector((state) => state.user);
}

/**
 * Hook for UI state
 */
export function useUI() {
  return useSelector((state) => state.ui);
}

/**
 * Hook for entity state by type
 */
export function useEntity<T>(entityType: string) {
  return useSelector((state) => {
    const entityState = state.entities[entityType];
    if (!entityState)
      return {
        byId: {},
        allIds: [],
        loading: false,
        error: null,
        metadata: { lastFetched: null, totalCount: null },
      };
    return entityState;
  }) as {
    byId: Record<string, T>;
    allIds: string[];
    loading: boolean;
    error: Error | null;
    metadata: { lastFetched: number | null; totalCount: number | null };
  };
}
