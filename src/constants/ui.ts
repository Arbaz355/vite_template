/**
 * UI Constants
 */

/**
 * Breakpoint sizes for responsive design
 */
export const Breakpoint = {
  XS: 'xs', // < 576px
  SM: 'sm', // >= 576px
  MD: 'md', // >= 768px
  LG: 'lg', // >= 992px
  XL: 'xl', // >= 1200px
  XXL: 'xxl', // >= 1400px
} as const;

/**
 * UI Theme modes
 */
export const ThemeMode = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

/**
 * Notification types
 */
export const NotificationType = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

/**
 * Loading states
 */
export const LoadingState = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

/**
 * UI specific constants
 */
export const UI = {
  SIDEBAR_WIDTH: 240,
  HEADER_HEIGHT: 64,
  FOOTER_HEIGHT: 60,
  TRANSITION: '0.3s ease-in-out',
  Z_INDEX: {
    MODAL: 1000,
    DROPDOWN: 900,
    HEADER: 800,
    SIDEBAR: 700,
  },
} as const;

// Type exports
export type BreakpointType = (typeof Breakpoint)[keyof typeof Breakpoint];
export type ThemeModeType = (typeof ThemeMode)[keyof typeof ThemeMode];
export type NotificationTypeType = (typeof NotificationType)[keyof typeof NotificationType];
export type LoadingStateType = (typeof LoadingState)[keyof typeof LoadingState];
