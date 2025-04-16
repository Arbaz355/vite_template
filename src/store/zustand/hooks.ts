/**
 * Zustand State Management Hooks
 *
 * This file provides custom hooks for accessing and updating state via Zustand.
 */

import { useStore } from './store';

/**
 * Hook for user state and actions
 */
export function useUser() {
  return {
    ...useStore((state) => state.user),
    setUser: useStore((state) => state.setUser),
    clearUser: useStore((state) => state.clearUser),
  };
}

/**
 * Hook for UI state and actions
 */
export function useUI() {
  return {
    ...useStore((state) => state.ui),
    setTheme: useStore((state) => state.setTheme),
    setLanguage: useStore((state) => state.setLanguage),
    setSidebarState: useStore((state) => state.setSidebarState),
    setSidebarActiveSection: useStore((state) => state.setSidebarActiveSection),
    addNotification: useStore((state) => state.addNotification),
    removeNotification: useStore((state) => state.removeNotification),
  };
}

/**
 * Hook for entity state by type
 */
export function useEntity<T>(entityType: string) {
  const entities = useStore((state) => state.entities);
  const entityState = entities[entityType] || {
    byId: {},
    allIds: [],
    loading: false,
    error: null,
    metadata: { lastFetched: null, totalCount: null },
  };

  const setEntityData = useStore((state) => state.setEntityData);
  const updateEntity = useStore((state) => state.updateEntity);
  const setEntityLoading = useStore((state) => state.setEntityLoading);
  const setEntityError = useStore((state) => state.setEntityError);

  return {
    data: entityState.byId as Record<string, T>,
    ids: entityState.allIds,
    loading: entityState.loading,
    error: entityState.error,
    metadata: entityState.metadata,

    // Actions
    setData: (data: T[], replace?: boolean) => setEntityData(entityType, data, replace),
    update: (id: string, data: Partial<T>) => updateEntity(entityType, id, data),
    setLoading: (loading: boolean) => setEntityLoading(entityType, loading),
    setError: (error: Error | null) => setEntityError(entityType, error),

    // Helper to get all items as an array
    getAll: () => entityState.allIds.map((id) => (entityState.byId as Record<string, T>)[id]),
  };
}

/**
 * Create a selector for memoized data access
 * This helps avoid unnecessary re-renders
 */
export function createSelector<T, R>(selector: (state: T) => R): (state: T) => R {
  return selector;
}

/**
 * Helper to create a selector that can be used with useStore
 * @example
 * const selectUserName = createStoreSelector(state => state.user.displayName);
 * const userName = useStore(selectUserName);
 */
export function createStoreSelector<T>(selector: (state: ReturnType<typeof useStore>) => T) {
  return selector;
}
