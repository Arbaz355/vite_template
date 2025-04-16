/**
 * UI Enums
 *
 * Define enums related to user interface elements.
 */

/**
 * Breakpoint sizes for responsive design
 */
export enum Breakpoint {
  XS = 'xs', // < 576px
  SM = 'sm', // >= 576px
  MD = 'md', // >= 768px
  LG = 'lg', // >= 992px
  XL = 'xl', // >= 1200px
  XXL = 'xxl', // >= 1400px
}

/**
 * UI Theme modes
 */
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

/**
 * Notification types
 */
export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

/**
 * Loading states
 */
export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
