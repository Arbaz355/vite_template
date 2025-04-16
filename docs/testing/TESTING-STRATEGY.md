# Enterprise Template Testing Strategy

This document outlines the comprehensive testing strategy for both the Vite and Next.js Enterprise Templates.

## Testing Principles

1. **Test Pyramid Approach**: Emphasis on unit tests, followed by integration tests, with fewer end-to-end tests
2. **Component-First Testing**: Component tests as the foundation of the testing strategy
3. **Type Safety**: Leveraging TypeScript to prevent type-related bugs
4. **Mock External Dependencies**: Consistent mocking approach for external services
5. **Continuous Integration**: Tests run on every push and pull request
6. **Code Coverage**: Maintain specified thresholds for code coverage

## Test Directory Structure

### Vite Template Test Structure

```
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.test.tsx  # Component co-located tests
│   │   │       └── ...
│   └── ...
└── tests/
    ├── unit/                    # Unit tests for utilities, hooks, etc.
    │   ├── utils/
    │   ├── hooks/
    │   └── store/
    ├── integration/             # Integration tests for features
    │   ├── auth/
    │   ├── dashboard/
    │   └── settings/
    ├── e2e/                     # End-to-end tests
    │   ├── auth.spec.ts
    │   ├── dashboard.spec.ts
    │   └── settings.spec.ts
    └── mocks/                   # Shared test mocks
        ├── handlers.ts
        ├── server.ts
        └── data/
```

### Next.js Template Test Structure

```
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── __tests__/       # Component tests in __tests__ directory
│   │   │       └── Button.test.tsx
│   └── ...
├── __tests__/                   # App-level tests
│   ├── unit/
│   ├── integration/
│   └── utils/
└── tests/
    ├── e2e/                     # Playwright e2e tests
    │   ├── auth.spec.ts
    │   ├── dashboard.spec.ts
    │   └── settings.spec.ts
    └── mocks/                   # Shared test mocks
        ├── handlers.ts
        ├── server.ts
        └── data/
```

## Testing Tools & Technologies

| Category | Vite Template | Next.js Template |
|----------|---------------|-----------------|
| Unit & Integration | Vitest, React Testing Library | Jest, React Testing Library |
| Component Testing | Vitest, React Testing Library | Jest, React Testing Library |
| API Testing | MSW, Vitest | MSW, Jest |
| E2E Testing | Playwright | Playwright |
| Visual Regression | Storybook + Chromatic | Storybook + Chromatic |
| Coverage | Vitest Coverage | Jest Coverage |
| Mocking | MSW, Vitest Mocks | MSW, Jest Mocks |

## Test Types

### 1. Unit Tests

- **Target**: Individual functions, hooks, and utilities
- **Approach**: Pure function testing with defined inputs and outputs
- **Tools**: Vitest/Jest
- **Co-location**: Located in same directory as source code or in tests/unit

### 2. Component Tests

- **Target**: Individual UI components
- **Approach**: React Testing Library with user-centric testing
- **Tools**: Vitest/Jest + React Testing Library
- **Co-location**: Next to component files or in __tests__ directories

### 3. Integration Tests

- **Target**: Features and workflows involving multiple components
- **Approach**: Testing component compositions and state interactions
- **Tools**: Vitest/Jest + React Testing Library + MSW
- **Location**: tests/integration directory

### 4. API Tests

- **Target**: API endpoints and data fetching logic
- **Approach**: Test request/response cycles with mocked backends
- **Tools**: MSW + Vitest/Jest
- **Location**: tests/api directory or co-located with API modules

### 5. End-to-End Tests

- **Target**: Complete user workflows across multiple pages
- **Approach**: Browser automation with real-world scenarios
- **Tools**: Playwright
- **Location**: tests/e2e directory

## Best Practices

1. **Write Tests First**: Adopt TDD where appropriate
2. **Focus on User Behavior**: Test from the user's perspective
3. **Avoid Implementation Details**: Test what components do, not how they do it
4. **Realistic Testing**: Use realistic data and scenarios
5. **Isolated Tests**: Each test should be independent and not rely on other tests
6. **Thorough Coverage**: Aim for high coverage of critical paths
7. **Continuous Testing**: Run tests on each commit and in CI
8. **Visual Testing**: Use snapshot or visual regression testing for UI components

## Automated Testing in CI

Both templates include CI configuration for:

- Running all tests on pull requests
- Enforcing code coverage thresholds
- Running linting alongside tests
- Generating and storing test reports
- Performing visual regression testing with Storybook

## Getting Started

### Running Tests in Vite Template

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

### Running Tests in Next.js Template

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## Test Documentation

Each test file should include:

1. Clear description of what is being tested
2. Setup and mock requirements
3. Expected outcomes
4. Coverage of edge cases and error states 