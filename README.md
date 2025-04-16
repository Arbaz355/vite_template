# React Enterprise Application

A modern, secure, and scalable React application with enterprise-grade features.

## Features

- 🔐 **Secure Authentication**: JWT token management with refresh capabilities
- 🔄 **Efficient Data Fetching**: SWR for caching, revalidation, and stale-while-revalidate strategy
- 🛡️ **Protected Routes**: Authentication and role-based access control
- 📱 **Responsive Images**: Optimized loading with lazy loading, WebP support, and blur-up effect
- 🔍 **SEO Optimization**: Metadata management with OpenGraph and Twitter card support
- 📦 **Code Splitting**: On-demand loading with TypeScript-safe lazy imports
- 🔒 **Secure Storage**: Unified API for localStorage, sessionStorage, and cookies with encryption
- 🚀 **CI/CD Pipeline**: Comprehensive GitLab CI/CD workflow

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd react-enterprise-app

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
```

### Building for Production

```bash
# Build the application
npm run build
# or
yarn build

# Preview the production build
npm run preview
# or
yarn preview
```

### Testing

```bash
# Run unit tests
npm run test:unit
# or
yarn test:unit

# Run integration tests
npm run test:integration
# or
yarn test:integration

# Run all tests with coverage
npm run test
# or
yarn test
```

## Using as a Template

This project is designed to be used as a starting template for new React applications. Here are several ways to use it:

### Quick Start with Degit

For a quick start without git history:

```bash
# Install degit
npm install -g degit

# Create new project from this template
degit yourusername/react-enterprise-app my-new-project

# Install dependencies
cd my-new-project
npm install
```

### GitHub Template

You can use GitHub's template feature:

1. Click the "Use this template" button on the GitHub repository
2. Name your new repository
3. Clone your new repository and start developing

### Other Template Options

For more advanced template usage, including:
- Creating a CRA template
- Setting up a Vite template
- Building a custom CLI tool
- Customization guidelines

See our detailed [Template Usage Guide](docs/template-usage.md).

## Project Structure

```
src/
├── core/                  # Core utilities and components
│   ├── api/               # API client and data fetching hooks
│   ├── auth/              # Authentication utilities
│   ├── components/        # Shared UI components
│   ├── router/            # Routing and guards
│   ├── storage/           # Storage utilities
│   └── utils/             # Helper functions
├── features/              # Feature modules
│   ├── auth/              # Authentication feature
│   ├── dashboard/         # Dashboard feature
│   └── ...
└── types/                 # Global TypeScript types
```

See the [Architecture Documentation](docs/architecture.md) for more details.

## Documentation

- [Architecture Documentation](docs/architecture.md) - Overview of project architecture and design principles
- [API Documentation](docs/api.md) - Details of the API client and data fetching hooks
- [Component Documentation](docs/components.md) - Information on key UI components
- [Template Usage Guide](docs/template-usage.md) - How to use this project as a template
- [Migration Guide](docs/migration-guide.md) - Guidelines for upgrading the project in the future
- [Deployment Strategies](docs/deployment-strategies.md) - Detailed guide for blue-green and canary deployment strategies

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
