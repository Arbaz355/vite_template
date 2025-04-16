# Architecture Overview

This project follows a feature-based architecture with a focus on maintainability, scalability, and developer experience. The folder structure is organized to group related code together while keeping the codebase approachable.

## Core Principles

- **Feature-First Organization**: Business logic is grouped by feature/domain
- **Separation of Concerns**: UI components separated from business logic
- **Clean Layer Separation**: Core services isolated from presentation
- **Reusability**: Shared components and utilities are properly abstracted
- **Discoverability**: Clear folder structure makes code easy to find

## Project Structure

```
src/
├── core/               # Application-wide core functionality
│   ├── api/            # API clients and interceptors
│   ├── config/         # App configuration and constants
│   ├── error/          # Error handling and monitoring
│   ├── hooks/          # Application-wide custom hooks
│   ├── logging/        # Logging services
│   ├── monitoring/     # Performance monitoring and analytics
│   ├── theme/          # Theme providers and styling
│   └── utils/          # Utility functions and helpers
│
├── features/           # Feature-based modules
│   ├── auth/           # Authentication and authorization
│   │   ├── api/        # Feature-specific API requests
│   │   ├── components/ # Feature-specific components
│   │   ├── hooks/      # Feature-specific hooks
│   │   ├── store/      # Feature-specific state
│   │   ├── types/      # Feature-specific types
│   │   ├── utils/      # Feature-specific utilities
│   │   └── index.ts    # Public API exports
│   │
│   └── [feature]/      # Other features follow the same pattern
│
├── shared/             # Shared functionality across features
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Shared UI components
│   │   ├── atoms/      # Basic building blocks (Button, Input)
│   │   ├── molecules/  # Combinations of atoms (Form fields)
│   │   ├── organisms/  # Complex components (Navbar, Sidebar)
│   │   └── templates/  # Page layouts and templates
│   ├── layouts/        # Application layouts
│   └── types/          # Common TypeScript types
│
├── lib/                # Third-party library integrations
│
├── store/              # Global state management
│
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Technology Stack

- **Vite**: Fast, modern build tool with excellent HMR
- **React**: Component-based UI library
- **TypeScript**: Static typing for better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

## Development Guidelines

1. **Feature Isolation**: Features should be self-contained with minimal dependencies on other features
2. **Component Design**: Follow Atomic Design principles for UI components
3. **State Management**: Use local state when possible, global state when necessary
4. **Type Safety**: Leverage TypeScript for type safety and better IDE support
5. **Code Splitting**: Use dynamic imports to optimize bundle size
6. **Error Handling**: Use error boundaries and proper error logging
7. **Performance**: Monitor and optimize for performance with proper memoization 