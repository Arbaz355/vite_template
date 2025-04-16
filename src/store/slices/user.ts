/**
 * User Slice
 *
 * This file contains the user state reducer and actions.
 */

import { Action, UserState } from '../types';
import { createAction } from '../utils';
import { initialState } from '../context';

// Action types
export const LOGIN = 'user/login';
export const LOGIN_SUCCESS = 'user/login/success';
export const LOGIN_FAILURE = 'user/login/failure';
export const LOGOUT = 'user/logout';
export const UPDATE_PROFILE = 'user/update_profile';
export const SET_USER_PREFERENCES = 'user/set_preferences';

// Action creators
export const login = createAction<{ email: string; password: string }>(LOGIN);
export const loginSuccess = createAction<Omit<UserState, 'loading' | 'error'>>(LOGIN_SUCCESS);
export const loginFailure = createAction<Error>(LOGIN_FAILURE);
export const logout = createAction(LOGOUT);
export const updateProfile = createAction<Partial<UserState>>(UPDATE_PROFILE);
export const setUserPreferences = createAction<Record<string, unknown>>(SET_USER_PREFERENCES);

// Reducer
export function userReducer(state: UserState = initialState.user, action: Action): UserState {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload as Error,
      };

    case LOGOUT:
      return {
        ...initialState.user,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        ...action.payload,
      };

    case SET_USER_PREFERENCES:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      };

    default:
      return state;
  }
}
