# Testing Strategy

This document outlines the testing strategy and practices for the application.

## Table of Contents

- [Testing Tools](#testing-tools)
- [Test Types](#test-types)
- [Testing Components](#testing-components)
- [Testing Hooks](#testing-hooks)
- [Testing Redux Store](#testing-redux-store)
- [Testing Asynchronous Code](#testing-asynchronous-code)
- [Mocking](#mocking)
- [Test Coverage](#test-coverage)
- [Testing in CI/CD](#testing-in-cicd)

## Testing Tools

The application uses the following testing tools:

- **Jest**: JavaScript testing framework
- **React Testing Library**: Library for testing React components
- **Mock Service Worker (MSW)**: API mocking library
- **User Event**: Library for simulating user events

## Test Types

### Unit Tests

Unit tests focus on testing individual components, functions, or modules in isolation. They verify that each piece of code works as expected.

```tsx
// Example of a unit test for a utility function
describe('formatCurrency', () => {
  test('formats currency correctly with default locale', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
  });

  test('formats currency correctly with custom locale', () => {
    expect(formatCurrency(1000, 'de-DE', 'EUR')).toBe('1.000,00 €');
  });
});
```

### Integration Tests

Integration tests verify that different parts of the application work together correctly.

```tsx
// Example of an integration test for a form and submission
test('form submission updates user profile', async () => {
  // Setup mock API response
  server.use(
    rest.put('/api/user/profile', (req, res, ctx) => {
      return res(ctx.json({ success: true }));
    })
  );

  render(<ProfileForm />);
  
  // Fill in form fields
  userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
  userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
  
  // Submit form
  userEvent.click(screen.getByRole('button', { name: /save/i }));
  
  // Verify success message appears
  expect(await screen.findByText(/profile updated/i)).toBeInTheDocument();
});
```

### End-to-End Tests

End-to-end tests verify the entire application workflow from start to finish. These tests are kept in a separate e2e directory and use tools like Cypress or Playwright.

## Testing Components

Components are tested using React Testing Library, focusing on user interactions and expected behavior rather than implementation details.

### Testing Principles

1. **Test behavior, not implementation**: Focus on what the component does, not how it does it
2. **Accessibility-first testing**: Use queries that reflect how users interact with your app
3. **Use user-centric queries**: Prefer `getByRole`, `getByLabelText`, and `getByText` over `getByTestId`

### Example Component Test

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button component', () => {
  test('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Testing Hooks

Custom React hooks are tested using the `renderHook` function from React Testing Library.

```tsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from '../useCounter';

describe('useCounter hook', () => {
  test('increments counter correctly', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

## Testing Redux Store

Redux store and related logic (actions, reducers, selectors) are tested separately.

```tsx
import reducer, { increment, decrement } from '../counterSlice';

describe('counter reducer', () => {
  test('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({ value: 0 });
  });

  test('should handle increment', () => {
    expect(reducer({ value: 0 }, increment())).toEqual({ value: 1 });
  });

  test('should handle decrement', () => {
    expect(reducer({ value: 1 }, decrement())).toEqual({ value: 0 });
  });
});
```

## Testing Asynchronous Code

Asynchronous operations are tested using Jest's async/await support.

```tsx
test('loads user data', async () => {
  // Setup mock API response
  server.use(
    rest.get('/api/user/1', (req, res, ctx) => {
      return res(ctx.json({ id: 1, name: 'John Doe' }));
    })
  );

  render(<UserProfile userId={1} />);
  
  // Wait for the data to load
  expect(await screen.findByText(/john doe/i)).toBeInTheDocument();
});
```

## Mocking

External dependencies are mocked to isolate the code being tested.

```tsx
// Mock a module
jest.mock('../api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: 1, name: 'John Doe' })),
}));

// Mock API responses using MSW
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: 'John Doe' }]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Test Coverage

Code coverage is measured using Jest's built-in coverage reporting. The coverage threshold is set to 70% for branches, functions, lines, and statements.

```bash
# Run tests with coverage report
npm run test:coverage
```

Coverage reports can be found in the `coverage` directory after running the tests.

## Testing in CI/CD

Tests are automatically run as part of the CI/CD pipeline. The pipeline:

1. Installs dependencies
2. Runs linting
3. Runs tests
4. Generates coverage report
5. Uploads coverage to SonarQube

Tests must pass before code can be merged or deployed. 