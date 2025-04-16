/**
 * Environment Configuration
 *
 * This file provides type-safe access to environment variables.
 * It also handles default values for missing environment variables.
 */

// Environment types
export type NodeEnv = 'development' | 'production' | 'uat' | 'local';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

// Ensure that a required environment variable exists
// This is kept for future use when we have truly required variables
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requireEnv = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// Get an optional environment variable with a default value
const getEnv = (key: string, defaultValue: string): string => {
  return import.meta.env[key] || defaultValue;
};

// Parse boolean environment variables
const getBoolEnv = (key: string, defaultValue: boolean): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true';
};

// Environment configuration
export const env = {
  // Core environment
  nodeEnv: getEnv('VITE_NODE_ENV', 'development') as NodeEnv,
  isDevelopment: getEnv('VITE_NODE_ENV', 'development') === 'development',
  isProduction: getEnv('VITE_NODE_ENV', 'development') === 'production',
  isUAT: getEnv('VITE_NODE_ENV', 'development') === 'uat',
  isLocal: getEnv('VITE_NODE_ENV', 'development') === 'local',

  // API Configuration
  apiUrl: getEnv('VITE_API_URL', '/api'),

  // Authentication Configuration
  authDomain: getEnv('VITE_AUTH_DOMAIN', ''),
  authClientId: getEnv('VITE_AUTH_CLIENT_ID', ''),

  // Feature Flags
  enableAnalytics: getBoolEnv('VITE_ENABLE_ANALYTICS', false),
  enableLogging: getBoolEnv('VITE_ENABLE_LOGGING', true),

  // Logging Configuration
  logLevel: getEnv('VITE_LOG_LEVEL', 'info') as LogLevel,
};

// Expose the environment configuration for debugging in non-production environments
if (!env.isProduction) {
  console.info('Environment Configuration:', env);
}
