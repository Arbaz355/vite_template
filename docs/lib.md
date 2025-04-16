# Lib Module

The `lib` directory contains third-party library integrations, adapters, and abstractions.

## Purpose

This directory serves as a boundary between external libraries and your application code. By creating adapters and abstractions for third-party dependencies, you can:

1. Limit the impact of library changes or replacements
2. Provide a consistent interface for your application
3. Simplify testing by mocking these abstractions
4. Customize third-party functionality to better fit your needs

## Structure

Each library integration should be contained in its own directory:

```
lib/
├── api/              # API client libraries (axios, fetch, etc.)
├── auth/             # Authentication libraries (auth0, firebase, etc.)
├── analytics/        # Analytics libraries (google analytics, mixpanel, etc.)
├── notifications/    # Notification libraries (firebase, pusher, etc.)
├── storage/          # Storage libraries (localforage, firebase, etc.)
├── payments/         # Payment gateways (stripe, paypal, etc.)
├── maps/             # Map libraries (google maps, mapbox, etc.)
└── ui/               # Third-party UI components
```

## Example

Here's an example of how to create an adapter for an analytics library:

```tsx
// lib/analytics/index.ts

// Types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

export interface AnalyticsUser {
  id: string;
  traits?: Record<string, any>;
}

export interface AnalyticsAdapter {
  initialize: (config: Record<string, any>) => void;
  identify: (user: AnalyticsUser) => void;
  track: (event: AnalyticsEvent) => void;
  page: (pageName: string, properties?: Record<string, any>) => void;
  reset: () => void;
}

// Implementation for Mixpanel
class MixpanelAdapter implements AnalyticsAdapter {
  initialize(config: Record<string, any>): void {
    // Initialize Mixpanel with config
  }

  identify(user: AnalyticsUser): void {
    // Mixpanel identify implementation
  }

  track(event: AnalyticsEvent): void {
    // Mixpanel track implementation
  }

  page(pageName: string, properties?: Record<string, any>): void {
    // Mixpanel page view implementation
  }

  reset(): void {
    // Reset user identification
  }
}

// Implementation for Google Analytics
class GoogleAnalyticsAdapter implements AnalyticsAdapter {
  // Similar implementation but for GA
}

// Factory to create the right adapter
export function createAnalyticsAdapter(provider: 'mixpanel' | 'ga'): AnalyticsAdapter {
  switch (provider) {
    case 'mixpanel':
      return new MixpanelAdapter();
    case 'ga':
      return new GoogleAnalyticsAdapter();
    default:
      throw new Error(`Unsupported analytics provider: ${provider}`);
  }
}

// Create a default instance based on configuration
const provider = import.meta.env.VITE_ANALYTICS_PROVIDER as 'mixpanel' | 'ga';
export const analytics = createAnalyticsAdapter(provider);
```

## Common Integrations

- API client adapters (Axios, fetch, etc.)
- State management adapters (Redux, MobX, Zustand, etc.)
- Authentication service adapters
- Analytics integrations
- Payment gateway adapters
- External service integrations
- Storage adapters
- UI component libraries

## Guidelines

1. Each library integration should be contained in its own directory
2. Export a clear public API that hides implementation details
3. Consider future library changes when designing abstractions
4. Provide appropriate TypeScript types
5. Include proper documentation and usage examples

## Best Practices

1. **Dependency Inversion**: Design to abstractions, not concrete implementations
2. **Single Responsibility**: Each adapter should focus on a single third-party library
3. **Configuration**: Allow for configuration but provide sensible defaults
4. **Error Handling**: Handle errors gracefully and provide clear error messages
5. **Testing**: Create mock implementations for testing
6. **Lazy Loading**: Consider lazy loading heavy libraries when possible 