# AI Prompts Guide for Building Vite React Enterprise Template

This document outlines the sequence of prompts you can use with an AI assistant to create the entire Vite React Enterprise Template from scratch. Follow these prompts in order to build a complete, production-ready React application template.

## 1. Project Initialization

```
Create a new Vite project with React and TypeScript. Configure it with the following:
- Latest React version
- TypeScript with strict type checking
- ESLint and Prettier configuration
- Add a proper .gitignore file
- Create a README.md with project overview
```

## 2. Project Structure Setup

```
Set up a scalable project structure for a large React application with the following directories:
- src/assets - for static assets
- src/components - for shared UI components
- src/constants - for application constants
- src/core - for core utilities and services
- src/enums - for TypeScript enums
- src/features - for feature modules
- src/hooks - for custom React hooks
- src/store - for state management
- src/types - for TypeScript type definitions
- src/utils - for utility functions

Also create appropriate README.md files in each directory explaining its purpose.
```

## 3. Core Utilities Setup

```
Create the following core utilities in the src/core directory:
1. A type-safe lazy loading utility for React components
2. Route guard components for authentication and role-based access
3. Error boundary components for graceful error handling
4. HTTP client wrapper around fetch with interceptors
5. Local storage utility with type safety
```

## 4. TypeScript Type Definitions

```
Set up the following TypeScript definitions in the src/types directory:
1. Common application types (User, Auth, etc.)
2. API response types
3. State management types
4. Component prop types
5. Environment variable types
```

## 5. Enums Setup

```
Create the following TypeScript enums in the src/enums directory:
1. Authentication status and methods
2. User roles and permissions
3. UI-related enums (theme modes, breakpoints, etc.)
4. HTTP status codes and methods
5. Common application status enums
```

## 6. State Management with Zustand

```
Implement Zustand for state management with the following features:
1. Set up the store with proper TypeScript typing
2. Create slices for user state, UI state, and entities
3. Implement actions for updating state
4. Create custom hooks for accessing store state
5. Add persistence with localStorage for relevant state
```

## 7. Authentication Feature

```
Create a complete authentication feature in src/features/auth with:
1. Login, register, and logout functionality
2. Token management (storage, refresh, etc.)
3. User context and hooks
4. Authentication API service
5. Protected route guards
```

## 8. Routing Setup

```
Set up React Router with the following features:
1. Route configuration with lazy loading
2. Nested routes for feature modules
3. Authentication guards
4. Role-based access guards
5. Not-found and error routes
```

## 9. UI Components

```
Create the following reusable UI components:
1. Button component with variants
2. Form components (Input, Select, Checkbox, etc.)
3. Modal and Dialog components
4. Notification/Toast system
5. Layout components (Container, Grid, etc.)
6. Loading indicators and skeletons
```

## 10. Theming System

```
Implement a theming system with:
1. Light, dark, and system theme modes
2. Theme context and provider
3. Theme switching functionality
4. CSS variables for theme colors
5. Media queries for responsive design
```

## 11. Form Handling

```
Create a form handling system with:
1. Form validation utilities
2. Custom form hooks
3. Error handling and display
4. Form submission with loading states
5. Form reset and initialization
```

## 12. API Integration

```
Set up API integration with:
1. Base API client with interceptors
2. Request and response handling
3. Error handling and retry logic
4. Caching strategies
5. API hooks for common operations
```

## 13. Testing Setup

```
Set up testing infrastructure with:
1. Jest configuration
2. React Testing Library setup
3. Mock service worker for API mocking
4. Test utilities and helpers
5. Example tests for components, hooks, and utilities
```

## 14. Error Handling

```
Implement comprehensive error handling:
1. Global error boundary
2. Error logging service
3. Error display components
4. API error handling
5. Form validation errors
```

## 15. Internationalization

```
Set up internationalization with:
1. i18next integration
2. Language switching
3. Translation loading
4. Date and number formatting
5. RTL support
```

## 16. Performance Optimization

```
Implement performance optimizations:
1. Code splitting and lazy loading
2. Memoization strategies
3. Virtualization for large lists
4. Image optimization
5. Bundle size analysis
```

## 17. CI/CD Configuration

```
Create CI/CD configuration with:
1. GitLab CI/CD pipeline
2. Linting and type checking jobs
3. Testing jobs
4. Build and deployment jobs
5. Environment-specific configurations
```

## 18. Documentation

```
Create comprehensive documentation:
1. Project overview and architecture
2. Getting started guide
3. Component documentation
4. State management documentation
5. Feature module documentation
```

## 19. Environment Configuration

```
Set up environment configuration:
1. Environment variables handling
2. Environment-specific settings
3. Feature flags
4. API endpoint configuration
5. Build-time vs. runtime configuration
```

## 20. Deployment Configuration

```
Create deployment configurations for:
1. Static hosting (Netlify, Vercel, etc.)
2. Docker containerization
3. Kubernetes deployment
4. Environment-specific settings
5. CI/CD integration
```

## Usage Instructions

To use these prompts effectively:
1. Start with prompt #1 and proceed in order
2. Wait for each step to be completed before moving to the next
3. Review the generated code and make adjustments as needed
4. For complex features, you may need to break down prompts into smaller tasks
5. Provide additional context or examples when necessary

This approach ensures a systematic development process that builds the project incrementally with each component properly integrated into the whole. 