/**
 * Type declarations for analytics and monitoring services
 *
 * This file contains type declarations for third-party analytics and monitoring services
 * that are loaded via script tags rather than npm packages.
 *
 * IMPORTANT: These services are only available at runtime when they are enabled
 * through the corresponding environment variables:
 * - Sentry: VITE_SENTRY_DSN
 * - LogRocket: VITE_LOGROCKET_ID
 * - Google Analytics: VITE_GA_MEASUREMENT_ID
 * - Dynatrace: VITE_DYNATRACE_ENVIRONMENT_ID and VITE_DYNATRACE_APPLICATION_ID
 */

// Sentry
declare namespace Sentry {
  interface Event {
    request?: {
      data?: unknown;
    };
  }

  interface Scope {
    setExtra(key: string, value: unknown): void;
  }

  interface BrowserTracing {
    new (): unknown;
  }

  function init(options: Record<string, unknown>): void;
  function configureScope(callback: (scope: Scope) => void): void;
  function withScope(callback: (scope: Scope) => void): void;
  function captureException(error: Error): void;
}

declare const SentryBrowserTracing: Sentry.BrowserTracing;

// LogRocket
declare namespace LogRocket {
  function init(appId: string, options?: Record<string, unknown>): void;
  function track(name: string, properties?: Record<string, unknown>): void;
  function getSessionURL(callback: (sessionURL: string) => void): void;
  function captureException(error: Error, options?: { extra?: Record<string, unknown> }): void;
}

// Google Analytics
interface Window {
  // Note: These properties only exist when Google Analytics is enabled via VITE_GA_MEASUREMENT_ID
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

// Dynatrace
declare namespace Dynatrace {
  interface ApiOptions {
    environmentId: string;
    applicationId: string;
  }

  // Note: Dynatrace doesn't expose a JavaScript API directly,
  // since it's loaded as a monitoring script that auto-instruments the page
  // This is a placeholder for potential future API if needed
}
