# Core Module

The `core` directory contains application-wide utilities, services, and configurations that are essential to the entire application.

## Structure

- **api/**: Base API client, interceptors, and common API utilities
- **config/**: Application configuration including environment variables and feature flags
- **error/**: Error handling utilities, error boundaries, and error reporting
- **hooks/**: Application-wide custom hooks 
- **logging/**: Logging services and utilities
- **monitoring/**: Performance monitoring, analytics, and telemetry
- **theme/**: Global styling, themes, and design tokens
- **utils/**: Utility functions and helper methods

## Purpose

This separation ensures that core application functionality is isolated from business logic and UI components, making it easier to maintain and test.

## Key Components

### Theme Provider

The Theme Provider (`core/theme/ThemeProvider.tsx`) handles application-wide theme preferences, including:

- Light/dark mode detection and switching
- Theme persistence in localStorage
- System preference detection
- React context for theme access throughout the application

### Error Handling

The Error Boundary (`core/error/ErrorBoundary.tsx`) provides centralized error handling:

- Catches and displays runtime errors
- Prevents application crashes
- Supports custom fallback UIs
- Integrates with the logging service

### Logging

The Logging service (`core/logging/index.ts`) provides:

- Centralized logging with multiple levels (debug, info, warn, error, fatal)
- Configuration for different environments
- Remote logging capability
- Structured log format
- Integration with error boundaries

### API Client

The HTTP client (`core/api/httpClient.ts`) offers:

- Standardized API communication
- Request/response interceptors
- Error handling
- Automatic response parsing
- Retry and timeout capabilities

## Best Practices

1. Keep core services focused on a single responsibility
2. Ensure core modules are well-documented and typed
3. Avoid business logic in core services
4. Create proper abstractions for third-party libraries
5. Implement comprehensive error handling
6. Write tests for all core functionality 