/**
 * User Types
 *
 * Define interfaces and types for users.
 */

import { UserRole, UserStatus, ProfileVisibility, NotificationChannel } from '../enums/user';

/**
 * User profile interface
 */
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  company?: string;
  jobTitle?: string;
  website?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    facebook?: string;
  };
  phone?: string;
  timezone?: string;
  language?: string;
  status: UserStatus;
  roles: UserRole[];
  permissions?: string[];
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  visibility: ProfileVisibility;
}

/**
 * User preferences interface
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    [key: string]: {
      enabled: boolean;
      channels: NotificationChannel[];
    };
  };
  emailFrequency: 'immediate' | 'daily' | 'weekly' | 'never';
  twoFactorEnabled: boolean;
  defaultDashboard?: string;
}

/**
 * User update payload interface
 */
export interface UserUpdatePayload {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  company?: string;
  jobTitle?: string;
  website?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    facebook?: string;
  };
  phone?: string;
}
