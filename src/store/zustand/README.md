# Zustand State Management

This directory contains the Zustand implementation for state management in our application.

## Why Zustand over React.memo?

### Advantages of Zustand over React.memo

1. **Simplified Component Logic**: Components no longer need to handle prop comparison or memoization.
2. **Targeted Re-Renders**: Only components that subscribe to specific state changes will re-render.
3. **Centralized State**: All application state is managed in one place, making debugging easier.
4. **Performance Optimization**: Automatic memoization of selectors reduces unnecessary re-renders.
5. **Simpler Testing**: Components are more focused on UI rather than state management.

### When to Use Each Approach

- **Use Zustand** when:
  - Multiple components need to share state
  - You need to persist state between component unmount/remount
  - Component state needs to be accessed by distant components (avoiding prop drilling)
  - You need to track and debug state changes
  
- **Use React.memo** when:
  - Your component is purely presentational with no state
  - Your component only depends on props and doesn't need global state
  - You have expensive rendering that needs to be optimized at the component level

## Using Zustand in Components

### Basic Usage

```tsx
import { useStore } from '../store/zustand/store';

function Counter() {
  // Subscribe to specific state values
  const count = useStore(state => state.count);
  const increment = useStore(state => state.increment);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### Custom Hooks for Better Reusability

We've created custom hooks in `hooks.ts` to make the state usage more convenient:

```tsx
import { useUser, useUI, useEntity } from '../store/zustand/hooks';

function UserProfile() {
  const { id, displayName, setUser } = useUser();
  
  return (
    <div>
      <h1>{displayName}</h1>
      <button onClick={() => setUser({ displayName: 'New Name' })}>
        Update Name
      </button>
    </div>
  );
}
```

### Optimizing Selectors

For complex selectors or expensive computations, you can use the `createStoreSelector` helper:

```tsx
import { useStore } from '../store/zustand/store';
import { createStoreSelector } from '../store/zustand/hooks';

// Create a memoized selector
const selectActiveUsers = createStoreSelector(state => 
  state.entities.users?.allIds
    .map(id => state.entities.users.byId[id])
    .filter(user => user.isActive)
);

function ActiveUsersList() {
  // Only re-render when the active users change
  const activeUsers = useStore(selectActiveUsers);
  
  return (
    <ul>
      {activeUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Examples

We've included several examples of components migrated from React.memo to Zustand:

1. **UserProfile.tsx**: Shows how to manage user state
2. **ThemeToggle.tsx**: Demonstrates UI state management
3. **DataTable.tsx**: Illustrates entity state management with pagination

Each example includes a "before" (with React.memo) and "after" (with Zustand) implementation for comparison.

## Extending the Store

To add new state or actions to the store:

1. Update the `StoreState` interface in `store.ts`
2. Add the initial state values
3. Implement the actions that modify the state
4. (Optional) Create custom hooks for the new state slice

## Testing Components with Zustand

For testing components that use Zustand, you can use the `create` function to create a test store:

```tsx
import { create } from 'zustand';
import { render, screen } from '@testing-library/react';
import { useStore } from '../store/zustand/store';

// Mock the store
jest.mock('../store/zustand/store', () => ({
  useStore: create(() => ({
    user: { displayName: 'Test User' },
    setUser: jest.fn(),
  })),
}));

test('renders user profile with mock store', () => {
  render(<UserProfile />);
  expect(screen.getByText('Test User')).toBeInTheDocument();
});
```

## Best Practices

1. **Keep State Minimal**: Only store what you need in global state
2. **Use Selectors**: Subscribe to the minimal state needed for your component
3. **Normalize Data**: Store entities in a normalized format for better performance
4. **Separate UI and Domain State**: Keep UI state separate from domain data
5. **Implement Middleware When Needed**: Add middleware for logging, persistence, etc. 