# React Enterprise Architecture Documentation

This directory contains comprehensive documentation for the architecture of the React application.

## Table of Contents

- [Architecture Overview](./architecture-overview.md) - Overview of the entire application architecture
- [Core Module](./core.md) - Documentation for the core application services and utilities
- [Features Module](./features.md) - Guide to feature-based organization and implementation
- [Shared Module](./shared.md) - Documentation for shared components and utilities
- [Lib Module](./lib.md) - Guide to third-party library integrations
- [Store Module](./store.md) - Documentation for state management
- [Environment Configuration](./environments.md) - Guide to environment configuration

## Getting Started

To understand the application architecture, we recommend reading the documentation in the following order:

1. Start with the [Architecture Overview](./architecture-overview.md) to get a high-level understanding
2. Read about the [Core Module](./core.md) to understand application-wide services
3. Explore the [Features Module](./features.md) to learn about domain-driven design approach
4. Review the [Shared Module](./shared.md) to understand component organization
5. Check the [Store Module](./store.md) to understand state management
6. Learn about the [Environment Configuration](./environments.md) to understand how the app is configured
7. Finally, read about the [Lib Module](./lib.md) to understand third-party integrations

## Development Guidelines

Refer to the specific module documentation for detailed guidelines on how to contribute to each part of the application. The architecture is designed to be modular and maintainable, following these principles:

- **Separation of Concerns**: Each module has a clear responsibility
- **Encapsulation**: Implementation details are hidden behind clear interfaces
- **Composition**: Complex features are built by composing smaller, focused components
- **Reusability**: Common functionality is extracted into reusable utilities and components

## Code Quality Tools

The project includes several tools to ensure code quality:

- **ESLint**: Static code analysis for identifying problematic patterns
- **Prettier**: Code formatter to ensure consistent style
- **TypeScript**: Static type checking
- **Husky**: Git hooks for pre-commit and pre-push validation
- **SonarQube**: Code quality and security analysis

## Additional Resources

- [Official React Documentation](https://react.dev/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/) 