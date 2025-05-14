/**
 * User Constants
 */
export const UserRole = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  GUEST: 'guest',
} as const;

export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  DELETED: 'deleted',
} as const;

export const ProfileVisibility = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  CONNECTIONS_ONLY: 'connections_only',
} as const;

export const NotificationChannel = {
  EMAIL: 'email',
  PUSH: 'push',
  SMS: 'sms',
  IN_APP: 'in_app',
  NONE: 'none',
} as const;

export const USER = {
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    BLOCKED: 'blocked',
  },
  PREFERENCES: {
    DEFAULT_THEME: 'light',
    DEFAULT_LANGUAGE: 'en',
  },
} as const;

// Type exports
export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];
export type ProfileVisibilityType = (typeof ProfileVisibility)[keyof typeof ProfileVisibility];
export type NotificationChannelType =
  (typeof NotificationChannel)[keyof typeof NotificationChannel];
