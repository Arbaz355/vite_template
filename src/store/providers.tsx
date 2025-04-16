/**
 * Store Provider
 *
 * This file contains the StoreProvider component that provides state to the application.
 */

import { ReactNode, useReducer, useEffect } from 'react';
import { StoreContext } from './context';
import { initialState } from './context';
import { mainReducer } from './reducers';
import { loadState, persistState } from './utils';
import { Action, AppState } from './types';

// Local storage key for persisted state
const STATE_STORAGE_KEY = 'app_state';

interface StoreProviderProps {
  children: ReactNode;
}

/**
 * StoreProvider component that wraps the application and provides state management
 */
export function StoreProvider({ children }: StoreProviderProps) {
  // Initialize reducer with state from localStorage if available
  const [state, dispatch] = useReducer(mainReducer, initialState, (initial: AppState) => {
    const persisted = loadState<AppState>(STATE_STORAGE_KEY);
    return persisted || initial;
  });

  // Persist state to localStorage when it changes
  useEffect(() => {
    persistState(STATE_STORAGE_KEY, state);
  }, [state]);

  // Create middleware for logging actions in development
  const dispatchWithMiddleware = (action: Action) => {
    if (import.meta.env.DEV) {
      console.group(`%cAction: ${action.type}`, 'color: #3498db');
      console.log('%cPrevious State:', 'color: #9E9E9E', state);
      console.log('%cAction:', 'color: #03A9F4', action);
    }

    dispatch(action);

    if (import.meta.env.DEV) {
      console.log('%cNext State:', 'color: #4CAF50', state);
      console.groupEnd();
    }
  };

  return (
    <StoreContext.Provider value={{ state, dispatch: dispatchWithMiddleware }}>
      {children}
    </StoreContext.Provider>
  );
}
