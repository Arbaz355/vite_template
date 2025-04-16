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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _getEnv = (key: string, defaultValue: string): string => {
  return import.meta.env[key] || defaultValue;
};

// Parse boolean environment variables
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _getBoolEnv = (key: string, defaultValue: boolean): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true';
};

// Environment configuration
interface EnvConfig {
  // Application
  nodeEnv: string;
  isProduction: boolean;
  isDevelopment: boolean;
  isTest: boolean;
  appVersion: string;

  // Features
  enableAnalytics: boolean;
  enableErrorTracking: boolean;

  // Analytics & Monitoring Services
  sentryDsn?: string;
  logRocketId?: string;
  gaMeasurementId?: string;
  dynatraceEnvironmentId?: string;
  dynatraceApplicationId?: string;
}

// Default environment configuration
export const env: EnvConfig = {
  // Application
  nodeEnv: import.meta.env.MODE || 'development',
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  isTest: import.meta.env.MODE === 'test',
  appVersion: import.meta.env.VITE_APP_VERSION || '0.1.0',

  // Features
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' || import.meta.env.PROD,
  enableErrorTracking:
    import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true' || import.meta.env.PROD,

  // Analytics & Monitoring Services
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  logRocketId: import.meta.env.VITE_LOGROCKET_ID,
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  dynatraceEnvironmentId: import.meta.env.VITE_DYNATRACE_ENVIRONMENT_ID,
  dynatraceApplicationId: import.meta.env.VITE_DYNATRACE_APPLICATION_ID,
};

// Expose the environment configuration for debugging in non-production environments
if (!env.isProduction) {
  console.info('Environment Configuration:', env);
}
