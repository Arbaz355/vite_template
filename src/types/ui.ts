/**
 * UI Types
 *
 * Define interfaces and types for UI components and state.
 */

import { NotificationType } from '../enums/ui';

/**
 * Notification interface
 */
export interface Notification {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
  timestamp: number;
  read?: boolean;
  onClick?: () => void;
}

/**
 * Modal interface
 */
export interface Modal {
  id: string;
  isOpen: boolean;
  data?: Record<string, unknown>;
}

/**
 * Modal state interface
 */
export interface ModalState {
  [key: string]: boolean;
}

/**
 * Loading state interface
 */
export interface LoadingState {
  [key: string]: boolean;
}

/**
 * UI State interface
 */
export interface UIState {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: Notification[];
  modals: ModalState;
  sidebar: {
    isOpen: boolean;
    activeSection: string | null;
  };
  loading: LoadingState;
}

/**
 * Common component props
 */
export interface BaseComponentProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  testId?: string;
}

/**
 * Size variants for components
 */
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Common button props
 */
export interface ButtonProps extends BaseComponentProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: SizeVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
}
