# Next.js Enterprise Template with SSG Creation Guide

This document outlines the step-by-step prompts needed to create a comprehensive Next.js Enterprise Template with Static Site Generation (SSG) capabilities using AI assistance. The IDE has flexibility to recommend and introduce appropriate changes where necessary to align with best practices.

## Project Initialization

1. **Project Setup**
   ```
   Create a new Next.js project with TypeScript support, configured for app router, and set up with the latest React version. Name it "nextjs-enterprise-template". Enable ESLint and use the recommended configurations.
   ```

2. **Initial Folder Structure**
   ```
   Create a scalable folder structure for an enterprise Next.js application with the following main directories: 
   - src/app (Next.js app router structure)
   - src/components (for shared components)
   - src/lib (for utilities and core functionality)
   - src/hooks (for custom React hooks)
   - src/store (for state management)
   - src/types (for TypeScript types)
   - src/styles (for global styles)
   - src/content (for static content)
   - public (for static assets)
   Include appropriate README.md files in each directory explaining its purpose.
   ```

3. **Dependencies Installation**
   ```
   Set up the following dependencies:
   - Next.js App Router for routing
   - Zustand for state management
   - Tailwind CSS for styling
   - next-mdx-remote for content handling
   - next-auth for authentication
   - next-i18next for internationalization 
   - React Testing Library, Jest, and Playwright for testing
   Configure each dependency properly with TypeScript support. Feel free to recommend alternative or additional packages that align with Next.js best practices.
   ```

## Core Module Implementation

4. **Types Setup**
   ```
   Create TypeScript types and interfaces for the core entities in our application, including:
   - User and authentication related types
   - UI and theme related types
   - API and data related types
   - Next.js specific page props and metadata types
   Place these in appropriate files within the src/types directory.
   ```

5. **Enums Creation**
   ```
   Set up TypeScript enums for constants used throughout the application, including:
   - AuthStatus enum (idle, authenticating, authenticated, unauthenticated, error)
   - UserRole enum (admin, manager, user, guest)
   - ThemeMode enum (light, dark, system)
   - Various other enums for standardizing string constants
   Create these in src/lib/enums directory with proper exports.
   ```

6. **Constants Definition**
   ```
   Define application constants in a structured manner, including:
   - Route constants
   - API endpoint constants
   - Application configuration constants
   - SSG revalidation settings
   Place these in src/lib/constants directory with appropriate organization.
   ```

7. **Utilities Creation**
   ```
   Implement utility functions for common operations:
   - Static site generation helpers
   - SEO and metadata utilities
   - Authentication-related utility functions
   - Date and time formatting utilities
   - Object and array manipulation utilities
   Place these in src/lib/utils with appropriate TypeScript typing.
   ```

8. **Middleware Implementation**
   ```
   Create Next.js middleware for:
   - Authentication protection
   - Role-based access control
   - Internationalization
   - Response headers management
   - Logging and analytics
   Implement in the src/middleware.ts file with appropriate configuration.
   ```

9. **Error Handling**
   ```
   Implement comprehensive error handling with:
   - Error boundary components
   - Not-found and error pages
   - API error handling utilities
   - Typed error classes
   - Error logging service
   Place in appropriate locations within the project structure.
   ```

## State Management

10. **Zustand Store Setup**
    ```
    Set up a Zustand store with:
    - User state slice (auth state, user data)
    - UI state slice (theme, language, notifications)
    - Content state slice (for cached content)
    - Type-safe selectors and actions
    Implement in src/store with TypeScript support.
    ```

11. **Custom Hooks**
    ```
    Create custom hooks for accessing store state and common operations:
    - useUser hook for user/auth state
    - useUI hook for UI state
    - useContent hook for content data
    - useSsg hook for static generation utilities
    - Other utility hooks (useApi, useForm, etc.)
    Place in src/hooks with TypeScript support.
    ```

## Authentication Implementation

12. **Next-Auth Setup**
    ```
    Configure Next-Auth for authentication:
    - Multiple provider support (credentials, OAuth)
    - JWT session handling
    - Database adapter setup
    - Custom login and registration pages
    - Role-based authorization
    Implement in src/app/api/auth and related components.
    ```

13. **User Management**
    ```
    Implement user management functionality:
    - User profile components
    - User settings
    - Role and permission management
    - User API endpoints
    Create in appropriate locations following Next.js conventions.
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
    - Card and container components
    Implement in src/components with TypeScript props and Storybook stories.
    ```

15. **Layout Components**
    ```
    Develop layout components:
    - RootLayout with provider wrappers
    - AppLayout with header, footer, navigation
    - Authentication layout
    - Dashboard layout
    - Marketing layouts
    Create in src/app/layouts and src/components/layouts with responsive design.
    ```

16. **Theme Implementation**
    ```
    Implement a robust theming system:
    - Theme provider with context
    - Light/dark/system mode support
    - Theme toggle component
    - CSS variables for theming
    - Server and client synchronized theme
    Place in appropriate locations with TypeScript support.
    ```

## Static Site Generation

17. **Content Management**
    ```
    Implement content management for SSG:
    - MDX processing utilities
    - Content fetching and caching
    - Static page generation configuration
    - Dynamic routes with fallback strategy
    - Incremental Static Regeneration settings
    Set up in appropriate Next.js page files and utilities.
    ```

18. **SEO Optimization**
    ```
    Implement SEO features for static pages:
    - Metadata component for each page
    - Structured data implementation
    - OpenGraph and Twitter card support
    - Sitemap and robots.txt generation
    - JSON-LD implementation
    Configure in layout files and page metadata exports.
    ```

## Feature Modules

19. **Homepage and Marketing**
    ```
    Create a marketing homepage with:
    - Hero section
    - Feature showcase
    - Testimonials
    - Pricing section
    - Call-to-action components
    Implement in src/app/(marketing) with static generation.
    ```

20. **Dashboard Feature**
    ```
    Create a sample dashboard feature:
    - Dashboard overview page
    - Dashboard components
    - Dashboard API endpoints
    - Dashboard data fetching with ISR
    Implement in src/app/(dashboard) with appropriate structure.
    ```

21. **Settings Feature**
    ```
    Implement a settings feature:
    - User settings components
    - Application settings
    - Settings management
    - Settings API endpoints
    Create in src/app/(dashboard)/settings with TypeScript support.
    ```

## Testing & Quality

22. **Test Setup**
    ```
    Set up comprehensive testing:
    - Unit tests for utilities and hooks
    - Component tests with React Testing Library
    - API route tests
    - End-to-end tests with Playwright
    - Mock adapters for external services
    Configure with Jest and proper TypeScript support.
    ```

23. **Documentation**
    ```
    Create comprehensive documentation:
    - README.md with project overview
    - Architecture documentation
    - Component documentation with Storybook
    - API documentation
    - Usage guides
    Place in appropriate locations throughout the project.
    ```

## Build & Deployment

24. **Build Configuration**
    ```
    Set up build and deployment configuration:
    - Next.js production build setup
    - Environment variables configuration
    - Build optimization settings
    - CI/CD pipeline configuration for multiple platforms
    Configure in next.config.js and appropriate config files.
    ```

25. **Vercel/Deployment Setup**
    ```
    Configure deployment setup:
    - Vercel configuration
    - Environment variable setup
    - Preview deployment settings
    - Analytics integration
    - Performance monitoring
    Implement in vercel.json and related configurations.
    ```

## Finishing Touches

26. **Code Quality Tools**
    ```
    Set up code quality tools:
    - ESLint with custom rule set
    - Prettier configuration
    - Husky for pre-commit hooks
    - TypeScript strict mode configuration
    - Lighthouse CI integration
    Configure in appropriate config files.
    ```

27. **Performance Optimization**
    ```
    Implement performance optimizations:
    - Image optimization with next/image
    - Font optimization with next/font
    - Script optimization
    - Bundle analysis
    - Caching strategies
    Configure in Next.js config and components.
    ```

28. **Final Documentation**
    ```
    Create final project documentation:
    - TEMPLATE-OVERVIEW.md with features and benefits
    - Getting started guide
    - Contribution guidelines
    - License and code of conduct
    - Deployment guides
    Place in the project root.
    ```

## Execution Order

For optimal development flow, follow this order:
1. Project initialization (steps 1-3)
2. Core types, enums, and constants (steps 4-6)
3. State management setup (steps 10-11)
4. Core utilities and middleware (steps 7-9)
5. Base UI components (steps 14-16)
6. Authentication implementation (steps 12-13)
7. Static site generation setup (steps 17-18)
8. Feature modules (steps 19-21)
9. Testing and quality tools (steps 22, 26)
10. Documentation and build setup (steps 23-25, 27-28)

This approach ensures that foundational elements are in place before building on them, reducing rework and maintaining consistency throughout the development process.

## IDE Flexibility Notes

The IDE has flexibility to adapt these instructions by:
1. Suggesting better alternatives to the proposed technologies where appropriate
2. Adapting the folder structure to align with evolving Next.js best practices
3. Choosing the most appropriate implementation approaches for each feature
4. Adding missing dependencies that would enhance the template
5. Restructuring components or utilities for better organization
6. Suggesting performance optimizations beyond those mentioned
7. Implementing additional security measures
8. Enhancing accessibility features
9. Adapting to the latest Next.js features and patterns
10. Providing alternate approaches where the primary approach might have limitations 