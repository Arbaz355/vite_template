/**
 * Zustand State Management
 *
 * This file defines the global store using Zustand.
 */

import { create } from 'zustand';
import { AppState, Notification } from '../types';
import { ThemeMode } from '../../enums/ui';

// Initial state (reusing the same structure from context.ts)
const initialState: AppState = {
  user: {
    id: null,
    email: null,
    displayName: null,
    isAuthenticated: false,
    roles: [],
    permissions: [],
    preferences: {},
    loading: false,
    error: null,
  },
  ui: {
    theme: ThemeMode.SYSTEM,
    language: 'en',
    notifications: [],
    modals: {},
    sidebar: {
      isOpen: true,
      activeSection: null,
    },
    loading: {},
  },
  entities: {},
};

// Define the store interface
interface StoreState extends AppState {
  // User actions
  setUser: (userData: Partial<AppState['user']>) => void;
  clearUser: () => void;

  // UI actions
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: string) => void;
  setSidebarState: (isOpen: boolean) => void;
  setSidebarActiveSection: (section: string | null) => void;
  addNotification: (notification: Omit<Notification, 'timestamp'>) => void;
  removeNotification: (id: string) => void;

  // Entities actions
  setEntityData: <T>(entityType: string, data: T[], replace?: boolean) => void;
  updateEntity: <T>(entityType: string, id: string, data: Partial<T>) => void;
  setEntityLoading: (entityType: string, loading: boolean) => void;
  setEntityError: (entityType: string, error: Error | null) => void;
}

// Create the store
export const useStore = create<StoreState>((set) => ({
  ...initialState,

  // User actions
  setUser: (userData) =>
    set((state) => ({
      user: { ...state.user, ...userData },
    })),

  clearUser: () =>
    set(() => ({
      user: { ...initialState.user },
    })),

  // UI actions
  setTheme: (theme) =>
    set((state) => ({
      ui: { ...state.ui, theme },
    })),

  setLanguage: (language) =>
    set((state) => ({
      ui: { ...state.ui, language },
    })),

  setSidebarState: (isOpen) =>
    set((state) => ({
      ui: { ...state.ui, sidebar: { ...state.ui.sidebar, isOpen } },
    })),

  setSidebarActiveSection: (activeSection) =>
    set((state) => ({
      ui: { ...state.ui, sidebar: { ...state.ui.sidebar, activeSection } },
    })),

  addNotification: (notification) =>
    set((state) => ({
      ui: {
        ...state.ui,
        notifications: [
          ...state.ui.notifications,
          {
            ...notification,
            timestamp: Date.now(),
          },
        ],
      },
    })),

  removeNotification: (id) =>
    set((state) => ({
      ui: {
        ...state.ui,
        notifications: state.ui.notifications.filter((n) => n.id !== id),
      },
    })),

  // Entities actions
  setEntityData: (entityType, data, replace = false) =>
    set((state) => {
      const currentEntity = state.entities[entityType] || {
        byId: {},
        allIds: [],
        loading: false,
        error: null,
        metadata: { lastFetched: null, totalCount: null },
      };

      const byId = replace ? {} : { ...currentEntity.byId };
      const newIds: string[] = [];

      // Process new data
      data.forEach((item) => {
        // Ensure item has an id property and it's cast to string
        const id =
          item && typeof item === 'object' && 'id' in item
            ? String(item.id)
            : String(Math.random());

        byId[id] = item;
        newIds.push(id);
      });

      const allIds = replace ? newIds : [...new Set([...currentEntity.allIds, ...newIds])];

      return {
        entities: {
          ...state.entities,
          [entityType]: {
            ...currentEntity,
            byId,
            allIds,
            metadata: {
              ...currentEntity.metadata,
              lastFetched: Date.now(),
              totalCount: allIds.length,
            },
          },
        },
      };
    }),

  updateEntity: (entityType, id, data) =>
    set((state) => {
      const currentEntity = state.entities[entityType];
      if (!currentEntity || !currentEntity.byId[id]) return state;

      return {
        entities: {
          ...state.entities,
          [entityType]: {
            ...currentEntity,
            byId: {
              ...currentEntity.byId,
              [id]: { ...currentEntity.byId[id], ...data },
            },
          },
        },
      };
    }),

  setEntityLoading: (entityType, loading) =>
    set((state) => {
      const currentEntity = state.entities[entityType] || {
        byId: {},
        allIds: [],
        loading: false,
        error: null,
        metadata: { lastFetched: null, totalCount: null },
      };

      return {
        entities: {
          ...state.entities,
          [entityType]: {
            ...currentEntity,
            loading,
          },
        },
      };
    }),

  setEntityError: (entityType, error) =>
    set((state) => {
      const currentEntity = state.entities[entityType] || {
        byId: {},
        allIds: [],
        loading: false,
        error: null,
        metadata: { lastFetched: null, totalCount: null },
      };

      return {
        entities: {
          ...state.entities,
          [entityType]: {
            ...currentEntity,
            error,
            loading: false,
          },
        },
      };
    }),
}));
