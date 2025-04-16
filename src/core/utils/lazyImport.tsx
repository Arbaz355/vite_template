/**
 * Lazy Import Utility
 *
 * Provides type-safe dynamic imports for React components with TypeScript.
 * Helps with code splitting to improve initial load performance.
 */

import React, { lazy, ComponentType } from 'react';

/**
 * Create a lazy-loaded component with proper TypeScript typing
 *
 * @example
 * // Import a component with named export
 * const { Home } = lazyImport(() => import('../pages/Home'), 'Home');
 *
 * // Import a component with default export
 * const Dashboard = lazyImport(() => import('../pages/Dashboard'));
 *
 * @param factory - Import function that returns a promise with the component module
 * @param exportName - (Optional) Name of the exported component if not using default export
 * @returns Lazy-loaded component with proper types
 */
// For default exports
export function lazyImport<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>
): React.LazyExoticComponent<T>;

// For named exports
export function lazyImport<T extends ComponentType<unknown>, K extends string>(
  factory: () => Promise<Record<K, T>>,
  exportName: K
): Record<K, React.LazyExoticComponent<T>>;

// Implementation
export function lazyImport<T extends ComponentType<unknown>, K extends string>(
  factory: () => Promise<Record<K, T> | { default: T }>,
  exportName?: K
): React.LazyExoticComponent<T> | Record<K, React.LazyExoticComponent<T>> {
  if (!exportName) {
    // Handle default export
    return lazy(factory as () => Promise<{ default: T }>);
  }

  // Handle named export
  const LazyComponent = lazy(async () => {
    const module = await factory() as Record<K, T>;
    return { default: module[exportName] };
  });

  return { [exportName]: LazyComponent } as Record<K, React.LazyExoticComponent<T>>;
}

/**
 * Suspense boundary with custom fallback
 *
 * @example
 * <SuspenseBoundary fallback={<LoadingSpinner />}>
 *   <LazyComponent />
 * </SuspenseBoundary>
 */
export const SuspenseBoundary: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ children, fallback = <DefaultFallback /> }) => {
  return <React.Suspense fallback={fallback}>{children}</React.Suspense>;
};

/**
 * Default loading fallback component
 */
const DefaultFallback: React.FC = () => (
  <div className="flex items-center justify-center w-full h-24">
    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
  </div>
);

/**
 * Error boundary to catch and handle errors in lazy-loaded components
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // Log error to an error reporting service
    console.error('Lazy load error:', error, info.componentStack);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 text-red-500">
            <h2 className="text-lg font-bold mb-2">Something went wrong</h2>
            <p className="text-sm">{this.state.error?.message || 'Failed to load the component'}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * Combined error boundary and suspense for lazy components
 */
export const LazyLoadWrapper: React.FC<{
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}> = ({ children, loadingFallback, errorFallback }) => (
  <ErrorBoundary fallback={errorFallback}>
    <SuspenseBoundary fallback={loadingFallback}>{children}</SuspenseBoundary>
  </ErrorBoundary>
);
