/**
 * User Enums
 *
 * Define enums related to users.
 */

/**
 * User roles in the application
 */
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  GUEST = 'guest',
}

/**
 * User status
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
  DELETED = 'deleted',
}

/**
 * Profile visibility settings
 */
export enum ProfileVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  CONNECTIONS_ONLY = 'connections_only',
}

/**
 * Notification preferences
 */
export enum NotificationChannel {
  EMAIL = 'email',
  PUSH = 'push',
  SMS = 'sms',
  IN_APP = 'in_app',
  NONE = 'none',
}
