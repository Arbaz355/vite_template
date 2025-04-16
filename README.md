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

## API Documentation

The application uses a centralized API client with hooks for data fetching. See the [API Documentation](docs/api.md) for details.

## Component Documentation

See the [Component Documentation](docs/components.md) for details on key UI components.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
