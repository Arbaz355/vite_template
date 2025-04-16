/**
 * Sanity Check Utility
 *
 * This file provides functions to verify the application's configuration
 * at startup and during runtime.
 */

import { env } from './env';

/**
 * Verify critical application requirements
 * Run this early in the application startup to catch issues
 */
export function verifyCriticalRequirements(): void {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    throw new Error('This application requires a browser environment');
  }

  // Check for required browser features
  if (!window.localStorage) {
    throw new Error('This application requires localStorage support');
  }

  // Add additional critical requirements as needed
}

/**
 * Perform sanity checks on the application configuration
 * These are warnings rather than fatal errors
 */
export function performSanityChecks(): void {
  // Only log in non-production environments
  if (env.isProduction) return;

  const warnings: string[] = [];

  // Check API URL
  if (!env.apiUrl || env.apiUrl === '/api') {
    warnings.push('API URL is not configured. Using default: /api');
  }

  // Check authentication configuration
  if (!env.authDomain || !env.authClientId) {
    warnings.push('Authentication is not fully configured. Some features may not work.');
  }

  // Log all warnings
  if (warnings.length > 0) {
    console.warn('🚨 Configuration Warnings:');
    warnings.forEach((warning) => console.warn(`- ${warning}`));
  } else {
    console.info('✅ All configuration checks passed');
  }
}

/**
 * Initialize the application with sanity checks
 */
export function initWithSanityChecks(): void {
  // Verify critical requirements first (these will throw if not met)
  verifyCriticalRequirements();

  // Then perform additional checks that generate warnings
  performSanityChecks();

  // Log environment
  console.info(`🚀 Application initialized in ${env.nodeEnv} environment`);
}
