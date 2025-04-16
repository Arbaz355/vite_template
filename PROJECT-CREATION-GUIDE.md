# Vite React Enterprise Template Creation Guide

This document outlines the step-by-step prompts needed to create the entire Vite React Enterprise Template from scratch using AI assistance.

## Project Initialization

1. **Project Setup**
   ```
   Create a new React project with Vite using TypeScript, set up with the latest React version. Name it "vite-react-enterprise-template".
   ```

2. **Initial Folder Structure**
   ```
   Create a scalable folder structure for an enterprise React application with the following main directories: 
   - src/core (for core functionality)
   - src/features (for feature modules)
   - src/components (for shared components)
   - src/store (for state management)
   - src/types (for TypeScript types)
   - src/utils (for utility functions)
   - src/assets (for static assets)
   Include appropriate README.md files in each directory explaining its purpose.
   ```

3. **Dependencies Installation**
   ```
   Set up the following dependencies:
   - React Router v7 for routing
   - Zustand for state management
   - Tailwind CSS for styling
   - React Helmet for document head management
   - i18next for internationalization
   - React Testing Library and Vitest for testing
   Configure each dependency properly with TypeScript support.
   ```

## Core Module Implementation

4. **Types Setup**
   ```
   Create TypeScript types and interfaces for the core entities in our application, including:
   - User and authentication related types
   - UI and theme related types
   - API and data related types
   Place these in appropriate files within the src/types directory.
   ```

5. **Enums Creation**
   ```
   Set up TypeScript enums for constants used throughout the application, including:
   - AuthStatus enum (idle, authenticating, authenticated, unauthenticated, error)
   - UserRole enum (admin, manager, user, guest)
   - ThemeMode enum (light, dark, system)
   - Various other enums for standardizing string constants
   Create these in src/enums directory with proper exports.
   ```

6. **Constants Definition**
   ```
   Define application constants in a structured manner, including:
   - Route constants
   - API endpoint constants
   - Application configuration constants
   Place these in src/constants directory with appropriate organization.
   ```

7. **Utilities Creation**
   ```
   Implement utility functions for common operations:
   - A type-safe lazy-loading utility for code splitting
   - Authentication-related utility functions
   - Date and time formatting utilities
   - Object and array manipulation utilities
   Place these in src/core/utils with appropriate TypeScript typing.
   ```

8. **Router Implementation**
   ```
   Create a robust routing system with:
   - Route configuration with nested routes
   - Authentication guards for protected routes
   - Role-based route guards
   - Not-found and error routes
   Implement in src/core/router with TypeScript support.
   ```

9. **Error Handling**
   ```
   Implement comprehensive error handling with:
   - Error boundary components
   - Error logging service
   - Typed error classes
   - Error handling hooks
   Place in appropriate locations within src/core.
   ```

## State Management

10. **Zustand Store Setup**
    ```
    Set up a Zustand store with:
    - User state slice (auth state, user data)
    - UI state slice (theme, language, notifications)
    - Entity state slice (for domain data)
    - Type-safe selectors and actions
    Implement in src/store with TypeScript support.
    ```

11. **Custom Hooks**
    ```
    Create custom hooks for accessing store state:
    - useUser hook for user/auth state
    - useUI hook for UI state
    - useEntity hook for domain data
    - Other utility hooks (useApi, useForm, etc.)
    Place in appropriate directories with TypeScript support.
    ```

## Authentication Implementation

12. **Auth Module**
    ```
    Create a comprehensive authentication module with:
    - Login and registration forms
    - Token management (storage, refresh)
    - Authentication API service
    - Protected route components
    Implement in src/features/auth with TypeScript support.
    ```

13. **User Management**
    ```
    Implement user management functionality:
    - User profile components
    - User settings
    - Role and permission management
    - User API service
    Create in src/features/user with appropriate structure.
    ```

## UI Components

14. **Base Components**
    ```
    Create reusable base UI components:
    - Button with variants
    - Input fields with validation
    - Modal and dialog components
    - Alert and notification components
    - Form components
    Implement in src/components with TypeScript props.
    ```

15. **Layout Components**
    ```
    Develop layout components:
    - AppLayout with header, footer, sidebar
    - Authentication layout
    - Dashboard layout
    - Error layout
    Create in src/components/layout with responsive design.
    ```

16. **Theme Implementation**
    ```
    Implement a robust theming system:
    - Theme provider with context
    - Light/dark/system mode support
    - Theme toggle component
    - CSS variables for theming
    Place in appropriate locations with TypeScript support.
    ```

## Feature Modules

17. **Dashboard Feature**
    ```
    Create a sample dashboard feature module:
    - Dashboard components
    - Dashboard services
    - Dashboard routes
    - Dashboard state management
    Implement in src/features/dashboard with proper structure.
    ```

18. **Settings Feature**
    ```
    Implement a settings feature:
    - User settings components
    - Application settings
    - Settings service and state
    - Settings routes
    Create in src/features/settings with TypeScript support.
    ```

## Testing & Quality

19. **Test Setup**
    ```
    Set up comprehensive testing:
    - Unit tests for utilities and hooks
    - Component tests with React Testing Library
    - Mock services for API testing
    - Test utils and helpers
    Configure with Vitest and proper TypeScript support.
    ```

20. **Documentation**
    ```
    Create comprehensive documentation:
    - README.md with project overview
    - Architecture documentation
    - Component documentation
    - API documentation
    - Usage guides
    Place in appropriate locations throughout the project.
    ```

## Build & Deployment

21. **Build Configuration**
    ```
    Set up build and deployment configuration:
    - Vite production build setup
    - Environment variables configuration
    - Build optimization settings
    - GitLab CI/CD pipeline configuration
    Configure in appropriate config files.
    ```

22. **Docker Setup**
    ```
    Create Docker configuration:
    - Dockerfile for production
    - Docker Compose for development
    - Docker-related documentation
    Place in the project root.
    ```

## Finishing Touches

23. **Code Quality Tools**
    ```
    Set up code quality tools:
    - ESLint with custom rule set
    - Prettier configuration
    - Husky for pre-commit hooks
    - TypeScript strict mode configuration
    Configure in appropriate config files.
    ```

24. **Performance Optimization**
    ```
    Implement performance optimizations:
    - Code splitting configuration
    - Bundle analyzer setup
    - Performance monitoring tools
    - Image and asset optimization
    Configure in appropriate locations.
    ```

25. **Final Documentation**
    ```
    Create final project documentation:
    - TEMPLATE-OVERVIEW.md with features and benefits
    - Getting started guide
    - Contribution guidelines
    - License and code of conduct
    Place in the project root.
    ```

## Execution Order

For optimal development flow, follow this order:
1. Project initialization (steps 1-3)
2. Core types, enums, and constants (steps 4-6)
3. State management setup (steps 10-11)
4. Core utilities and router (steps 7-9)
5. Base UI components (steps 14-16)
6. Authentication implementation (steps 12-13)
7. Feature modules (steps 17-18)
8. Testing and quality tools (steps 19, 23)
9. Documentation and build setup (steps 20-22, 24-25)

This approach ensures that foundational elements are in place before building on them, reducing rework and maintaining consistency throughout the development process. 