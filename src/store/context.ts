/**
 * State Management Context
 *
 * This file defines the React context used for state management.
 */

import { createContext } from 'react';
import { AppState, StoreContextType } from './types';

// Initial state
export const initialState: AppState = {
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
    theme: 'system',
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

// Create store context with initial values
export const StoreContext = createContext<StoreContextType>({
  state: initialState,
  dispatch: () => null,
});
