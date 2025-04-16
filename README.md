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

## Documentation

Comprehensive documentation is available in the [`docs`](./docs) directory:

- [Architecture Overview](./docs/architecture-overview.md)
- [Core Module](./docs/core.md)
- [Features Module](./docs/features.md)
- [Shared Module](./docs/shared.md)
- [Lib Module](./docs/lib.md)
- [Store Module](./docs/store.md)

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

# Build for production
npm run build
```

## License

MIT
