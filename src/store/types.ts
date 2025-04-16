/**
 * State Management Types
 *
 * This file contains the core types for state management.
 */

import { ThemeMode, NotificationType } from '../enums/ui';

// Action Types
export type ActionType = string;

export interface Action<T = unknown> {
  type: ActionType;
  payload?: T;
  meta?: Record<string, unknown>;
  error?: boolean;
}

// State Types
export interface AppState {
  user: UserState;
  ui: UIState;
  entities: EntitiesState;
}

export interface UserState {
  id: string | null;
  email: string | null;
  displayName: string | null;
  isAuthenticated: boolean;
  roles: string[];
  permissions: string[];
  preferences: Record<string, unknown>;
  loading: boolean;
  error: Error | null;
}

export interface UIState {
  theme: ThemeMode;
  language: string;
  notifications: Notification[];
  modals: {
    [key: string]: boolean;
  };
  sidebar: {
    isOpen: boolean;
    activeSection: string | null;
  };
  loading: {
    [key: string]: boolean;
  };
}

export interface EntitiesState {
  [entityType: string]: {
    byId: Record<string, unknown>;
    allIds: string[];
    loading: boolean;
    error: Error | null;
    metadata: {
      lastFetched: number | null;
      totalCount: number | null;
    };
  };
}

// Notification type for UI state
export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  autoClose?: boolean;
  duration?: number;
  timestamp: number;
}

// Selectors
export type Selector<T> = (state: AppState) => T;

// Async Status
export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

// Store Context Type
export interface StoreContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}
