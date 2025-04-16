# React Enterprise Architecture

A modern, scalable architecture for enterprise React applications using Vite, TypeScript, and Tailwind CSS.

## Architecture Overview

This project follows a feature-based architecture with a focus on maintainability, scalability, and developer experience. The folder structure is organized to group related code together while keeping the codebase approachable.

## Key Features

- **Feature-First Organization**: Business logic grouped by domain
- **Separation of Concerns**: Clean separation between layers
- **Atomic Design Components**: Reusable UI library
- **Strong Typing**: Full TypeScript support
- **Scalable State Management**: Flexible state management options
- **Performance Optimized**: Built with Vite for fast development and production
- **Environment Configuration**: Support for multiple environments (dev, local, UAT, prod)
- **Code Quality Tools**: ESLint, Prettier, Husky, SonarQube integration

## Documentation

Comprehensive documentation is available in the [`docs`](./docs) directory:

- [Architecture Overview](./docs/architecture-overview.md)
- [Core Module](./docs/core.md)
- [Features Module](./docs/features.md)
- [Shared Module](./docs/shared.md)
- [Lib Module](./docs/lib.md)
- [Store Module](./docs/store.md)
- [Environment Configuration](./docs/environments.md)

See the [documentation index](./docs/index.md) for a complete overview.

## Project Structure

```
src/
├── core/               # Application-wide core functionality
├── features/           # Feature-based modules
├── shared/             # Shared functionality across features
├── lib/                # Third-party library integrations
└── store/              # Global state management
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Start with specific environment
npm run dev:local   # Local environment
npm run dev:uat     # UAT environment

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run dev:local`: Start with local environment
- `npm run dev:uat`: Start with UAT environment
- `npm run build`: Build for production
- `npm run build:uat`: Build for UAT environment
- `npm run build:prod`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Run ESLint with auto-fix
- `npm run format`: Format code with Prettier
- `npm run format:check`: Check code formatting
- `npm run sonar`: Run SonarQube analysis

## License

MIT
