# Environment Configuration

This document outlines the environment configuration setup for the application.

## Environment Files

The application uses environment files for different environments:

- `.env.development`: Default development environment, used when running `npm run dev`
- `.env.local`: Local development environment, used when running `npm run dev:local`
- `.env.uat`: UAT environment, used when running `npm run dev:uat` or `npm run build:uat`
- `.env.production`: Production environment, used when running `npm run build:prod`

## Configuration Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_NODE_ENV` | Environment name | `development` |
| `VITE_API_URL` | Base URL for API requests | `/api` |
| `VITE_AUTH_DOMAIN` | Authentication domain | `''` |
| `VITE_AUTH_CLIENT_ID` | Authentication client ID | `''` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics tracking | `false` |
| `VITE_ENABLE_LOGGING` | Enable application logging | `true` |
| `VITE_LOG_LEVEL` | Logging level | `info` |

## Type-Safe Configuration

The application provides type-safe access to environment variables through the `env` object:

```typescript
import { env } from 'src/core/config';

// Using environment variables
const apiUrl = env.apiUrl;

// Environment checks
if (env.isDevelopment) {
  // Development-only code
}

// Feature flags
if (env.enableAnalytics) {
  // Initialize analytics
}
```

## Adding New Environment Variables

To add a new environment variable:

1. Add the variable to each environment file (`.env.*`)
2. Update the `env` object in `src/core/config/env.ts`
3. Update this documentation

## Environment Scripts

The following scripts are available for running the application in different environments:

- `npm run dev`: Run in development mode
- `npm run dev:local`: Run in local development mode
- `npm run dev:uat`: Run in UAT mode
- `npm run build`: Build for production
- `npm run build:uat`: Build for UAT
- `npm run build:prod`: Build for production

## Running with dotenv-cli

You can also run any command with a specific environment file:

```bash
npx dotenv -e .env.uat npm run dev
```

## Sanity Checks

The application includes sanity checks that verify the environment configuration at startup:

- Critical requirements are checked and will throw errors if not met
- Non-critical issues will output warnings to the console

These checks are defined in `src/core/config/sanity.ts` and are automatically run during application initialization. 