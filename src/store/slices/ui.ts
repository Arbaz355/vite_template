/**
 * UI Slice
 *
 * This file contains the UI state reducer and actions.
 */

import { Action, UIState, Notification } from '../types';
import { createAction } from '../utils';
import { initialState } from '../context';

// Action types
export const SET_THEME = 'ui/set_theme';
export const SET_LANGUAGE = 'ui/set_language';
export const ADD_NOTIFICATION = 'ui/add_notification';
export const REMOVE_NOTIFICATION = 'ui/remove_notification';
export const CLEAR_NOTIFICATIONS = 'ui/clear_notifications';
export const SET_MODAL = 'ui/set_modal';
export const TOGGLE_SIDEBAR = 'ui/toggle_sidebar';
export const SET_SIDEBAR_SECTION = 'ui/set_sidebar_section';
export const SET_LOADING = 'ui/set_loading';

// Action creators
export const setTheme = createAction<'light' | 'dark' | 'system'>(SET_THEME);
export const setLanguage = createAction<string>(SET_LANGUAGE);
export const addNotification =
  createAction<Omit<Notification, 'id' | 'timestamp'>>(ADD_NOTIFICATION);
export const removeNotification = createAction<string>(REMOVE_NOTIFICATION);
export const clearNotifications = createAction(CLEAR_NOTIFICATIONS);
export const setModal = createAction<{ modalId: string; isOpen: boolean }>(SET_MODAL);
export const toggleSidebar = createAction<boolean | undefined>(TOGGLE_SIDEBAR);
export const setSidebarSection = createAction<string | null>(SET_SIDEBAR_SECTION);
export const setLoading = createAction<{ key: string; isLoading: boolean }>(SET_LOADING);

// Helper function to generate a unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Reducer
export function uiReducer(state: UIState = initialState.ui, action: Action): UIState {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    case ADD_NOTIFICATION: {
      const newNotification: Notification = {
        id: generateId(),
        timestamp: Date.now(),
        ...action.payload,
      };

      return {
        ...state,
        notifications: [...state.notifications, newNotification],
      };
    }

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };

    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };

    case SET_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.modalId]: action.payload.isOpen,
        },
      };

    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          isOpen: action.payload !== undefined ? action.payload : !state.sidebar.isOpen,
        },
      };

    case SET_SIDEBAR_SECTION:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          activeSection: action.payload,
        },
      };

    case SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.isLoading,
        },
      };

    default:
      return state;
  }
}
