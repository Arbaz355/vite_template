/**
 * State Management
 *
 * This is the main entry point for state management in the application.
 * It exports the Zustand state management hooks and store.
 */

// Export types for shared usage
export * from './types';

// Export the Zustand implementation
export { useStore } from './zustand/store';
export { useUser, useUI, useEntity, createSelector, createStoreSelector } from './zustand/hooks';
