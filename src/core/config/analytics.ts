/**
 * Analytics & Error Tracking Configuration
 *
 * This file integrates various analytics and monitoring tools:
 * - Sentry: Error tracking and monitoring
 * - LogRocket: Session replay and monitoring
 * - Google Analytics: Web analytics
 * - Dynatrace: Application performance monitoring
 */

// Define the types we need for our analytics services
interface SentryEvent {
  request?: {
    data?: unknown;
  };
}

interface SentryScope {
  setExtra(key: string, value: unknown): void;
}

interface SentryAPI {
  init(options: Record<string, unknown>): void;
  configureScope(callback: (scope: SentryScope) => void): void;
  withScope(callback: (scope: SentryScope) => void): void;
  captureException(error: Error): void;
}

interface LogRocketAPI {
  init(appId: string, options?: Record<string, unknown>): void;
  track(name: string, properties?: Record<string, unknown>): void;
  getSessionURL(callback: (sessionURL: string) => void): void;
  captureException(error: Error, options?: { extra?: Record<string, unknown> }): void;
}

// Import the actual modules (without type checking)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Sentry = (window as any).Sentry as SentryAPI | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BrowserTracing = (window as any).SentryBrowserTracing;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LogRocket = (window as any).LogRocket as LogRocketAPI | undefined;

import { env } from './env';

// Types for analytics configurations
interface SentryConfig {
  dsn: string;
  environment: string;
  release: string;
  tracesSampleRate: number;
  ignoreErrors: RegExp[];
  beforeSend?: (event: SentryEvent) => SentryEvent | null;
}

interface LogRocketConfig {
  appId: string;
  release: string;
  network: {
    isEnabled: boolean;
    requestSanitizer: (request: Record<string, unknown>) => Record<string, unknown>;
    responseSanitizer: (response: Record<string, unknown>) => Record<string, unknown>;
  };
}

interface GoogleAnalyticsConfig {
  measurementId: string;
  debug: boolean;
}

interface DynatraceConfig {
  environmentId: string;
  applicationId: string;
}

export interface AnalyticsConfig {
  isEnabled: boolean;
  sentry: SentryConfig;
  logRocket: LogRocketConfig;
  googleAnalytics: GoogleAnalyticsConfig;
  dynatrace: DynatraceConfig;
}

// Utility functions for sanitizing data in monitoring tools
const sanitizeSensitiveData = <T>(data: T): T => {
  if (!data) return data;

  // Deep clone to avoid modifying the original
  const sanitized = JSON.parse(JSON.stringify(data));

  // List of sensitive fields to redact
  const sensitiveFields = [
    'password',
    'token',
    'access_token',
    'refresh_token',
    'authorization',
    'cookie',
    'ssn',
    'credit_card',
    'card_number',
    'cvv',
    'secret',
  ];

  // Recursive function to redact fields
  const redact = (obj: Record<string, unknown>): void => {
    if (!obj || typeof obj !== 'object') return;

    Object.keys(obj).forEach((key) => {
      const lowerKey = key.toLowerCase();

      if (sensitiveFields.some((field) => lowerKey.includes(field))) {
        obj[key] = '[REDACTED]';
      } else if (typeof obj[key] === 'object') {
        redact(obj[key] as Record<string, unknown>);
      }
    });
  };

  redact(sanitized);
  return sanitized;
};

// Default analytics configuration
export const analyticsConfig: AnalyticsConfig = {
  isEnabled: env.enableAnalytics,

  sentry: {
    dsn: env.sentryDsn || '',
    environment: env.nodeEnv,
    release: env.appVersion,
    tracesSampleRate: env.isProduction ? 0.2 : 1.0,
    ignoreErrors: [
      // Common browser extensions errors
      /Extensions/i,
      /^chrome-extension/,
      // Network errors that we don't need to track
      /Network request failed/i,
      /Failed to fetch/i,
      /Load failed/i,
      // Random third-party scripts
      /Script error/i,
    ],
    beforeSend: (event) => {
      // Don't send events in development
      if (env.isDevelopment) return null;

      // Sanitize sensitive data
      if (event.request && event.request.data) {
        event.request.data = sanitizeSensitiveData(event.request.data);
      }

      return event;
    },
  },

  logRocket: {
    appId: env.logRocketId || '',
    release: env.appVersion,
    network: {
      isEnabled: true,
      requestSanitizer: (request) => {
        // Sanitize headers
        if (request.headers) {
          request.headers = sanitizeSensitiveData(request.headers);
        }

        // Sanitize body
        if (request.body) {
          request.body = sanitizeSensitiveData(request.body);
        }

        return request;
      },
      responseSanitizer: (response) => {
        // Sanitize body
        if (response.body) {
          response.body = sanitizeSensitiveData(response.body);
        }

        return response;
      },
    },
  },

  googleAnalytics: {
    measurementId: env.gaMeasurementId || '',
    debug: !env.isProduction,
  },

  dynatrace: {
    environmentId: env.dynatraceEnvironmentId || '',
    applicationId: env.dynatraceApplicationId || '',
  },
};

/**
 * Analytics Service - Singleton
 *
 * Provides a unified interface for working with all integrated monitoring
 * and analytics services.
 */
class AnalyticsService {
  private initialized = false;
  private config: AnalyticsConfig;

  constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  /**
   * Initialize all analytics services
   */
  initialize(): void {
    if (this.initialized || !this.config.isEnabled) return;

    // Initialize Sentry for error tracking
    this.initializeSentry();

    // Initialize LogRocket for session recording
    this.initializeLogRocket();

    // Initialize Google Analytics
    this.initializeGoogleAnalytics();

    // Initialize Dynatrace
    this.initializeDynatrace();

    this.initialized = true;

    if (!env.isProduction) {
      console.info('Analytics services initialized');
    }
  }

  /**
   * Initialize Sentry for error tracking
   */
  private initializeSentry(): void {
    const { sentry } = this.config;

    if (!sentry.dsn || !Sentry) return;

    Sentry.init({
      dsn: sentry.dsn,
      integrations: [new BrowserTracing()],
      tracesSampleRate: sentry.tracesSampleRate,
      environment: sentry.environment,
      release: sentry.release,
      ignoreErrors: sentry.ignoreErrors,
      beforeSend: sentry.beforeSend,
    });
  }

  /**
   * Initialize LogRocket for session recording
   */
  private initializeLogRocket(): void {
    const { logRocket } = this.config;

    if (!logRocket.appId || !LogRocket) return;

    LogRocket.init(logRocket.appId, {
      release: logRocket.release,
      network: {
        isEnabled: logRocket.network.isEnabled,
        requestSanitizer: logRocket.network.requestSanitizer,
        responseSanitizer: logRocket.network.responseSanitizer,
      },
    });

    // Connect LogRocket with Sentry if both are enabled
    if (this.config.sentry.dsn && Sentry) {
      LogRocket.getSessionURL((sessionURL: string) => {
        Sentry?.configureScope((scope: SentryScope) => {
          scope.setExtra('logRocketSession', sessionURL);
        });
      });
    }
  }

  /**
   * Initialize Google Analytics
   */
  private initializeGoogleAnalytics(): void {
    const { googleAnalytics } = this.config;

    if (!googleAnalytics.measurementId) return;

    // Load the Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalytics.measurementId}`;
    document.head.appendChild(script);

    // Initialize GA
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', googleAnalytics.measurementId, {
      debug_mode: googleAnalytics.debug,
    });
  }

  /**
   * Initialize Dynatrace
   */
  private initializeDynatrace(): void {
    const { dynatrace } = this.config;

    if (!dynatrace.environmentId || !dynatrace.applicationId) return;

    // Load the Dynatrace script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://${dynatrace.environmentId}.live.dynatrace.com/js/app-${dynatrace.applicationId}.js`;
    document.head.appendChild(script);
  }

  /**
   * Track a page view
   */
  trackPageView(path: string): void {
    if (!this.initialized || !this.config.isEnabled) return;

    // Track in Google Analytics
    if (this.config.googleAnalytics.measurementId && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
      });
    }

    // Track in LogRocket
    if (this.config.logRocket.appId && LogRocket) {
      LogRocket.track('pageview', {
        path,
      });
    }
  }

  /**
   * Track a custom event
   */
  trackEvent(category: string, action: string, label?: string, value?: number): void {
    if (!this.initialized || !this.config.isEnabled) return;

    const eventData = {
      event_category: category,
      event_label: label,
      value,
    };

    // Track in Google Analytics
    if (this.config.googleAnalytics.measurementId && window.gtag) {
      window.gtag('event', action, eventData);
    }

    // Track in LogRocket
    if (this.config.logRocket.appId && LogRocket) {
      LogRocket.track(action, {
        category,
        label,
        value,
      });
    }
  }

  /**
   * Capture an error
   */
  captureError(error: Error, context?: Record<string, unknown>): void {
    if (!this.initialized || !this.config.isEnabled) return;

    // Capture in Sentry
    if (this.config.sentry.dsn && Sentry) {
      if (context) {
        Sentry.withScope((scope: SentryScope) => {
          Object.entries(context).forEach(([key, value]) => {
            scope.setExtra(key, value);
          });
          Sentry.captureException(error);
        });
      } else {
        Sentry.captureException(error);
      }
    }

    // Log in LogRocket
    if (this.config.logRocket.appId && LogRocket) {
      LogRocket.captureException(error, {
        extra: context,
      });
    }
  }
}

// Create a singleton instance
export const analytics = new AnalyticsService(analyticsConfig);

// Type augmentation for window object to add gtag
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
