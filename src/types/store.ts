/**
 * Store Types
 *
 * Define interfaces and types for state management.
 */

import { UIState } from './ui';
import { AuthState } from './auth';

/**
 * Action interface
 */
export interface Action<T = unknown> {
  type: string;
  payload?: T;
  meta?: Record<string, unknown>;
  error?: boolean;
}

/**
 * Async action status
 */
export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

/**
 * Async action state
 */
export interface AsyncState {
  status: AsyncStatus;
  error: Error | null;
  timestamp: number | null;
}

/**
 * Root state interface
 */
export interface RootState {
  auth: AuthState;
  ui: UIState;
  entities: EntitiesState;
}

/**
 * Entities state interface for normalized data
 */
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

/**
 * Selector type
 */
export type Selector<T> = (state: RootState) => T;

/**
 * Store context type
 */
export interface StoreContextType {
  state: RootState;
  dispatch: React.Dispatch<Action>;
}
