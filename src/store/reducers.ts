/**
 * Root Reducer
 *
 * This file combines all reducers into a single root reducer.
 */

import {
  AppState,
  combineReducers,
  entitiesReducer,
  initialState,
  uiReducer,
  userReducer,
} from '.';

import { Action } from '.';

// Root reducer that combines all reducers
export const rootReducer = combineReducers<AppState, Action>({
  user: userReducer,
  ui: uiReducer,
  entities: entitiesReducer,
});

// Main reducer function with state initialization
export function mainReducer(state = initialState, action: Action): AppState {
  // Handle app-level actions here before delegating to specific reducers
  switch (action.type) {
    case 'RESET_APP':
      return initialState;

    case 'HYDRATE_STATE':
      return action.payload as AppState;

    default:
      return rootReducer(state, action);
  }
}
