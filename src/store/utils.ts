/**
 * State Management Utilities
 *
 * This file contains utility functions for state management.
 */

import { Action } from './types';

// Type for a reducer function
export type Reducer<S, A extends Action> = (state: S, action: A) => S;

// Type for a record of reducers
export type ReducersMapObject<S, A extends Action> = {
  [K in keyof S]: Reducer<S[K], A>;
};

/**
 * Combines multiple reducers into a single reducer function
 */
export function combineReducers<S, A extends Action>(
  reducers: ReducersMapObject<S, A>
): Reducer<S, A> {
  return (state: S, action: A) => {
    const nextState: Partial<S> = {};
    let hasChanged = false;

    for (const key in reducers) {
      if (Object.prototype.hasOwnProperty.call(reducers, key)) {
        const reducer = reducers[key];
        const previousStateForKey = state[key];
        const nextStateForKey = reducer(previousStateForKey, action);

        nextState[key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      }
    }

    return hasChanged ? (nextState as S) : state;
  };
}

/**
 * Creates a selector function with memoization
 */
export function createSelector<S, R>(
  selector: (state: S) => R,
  ...dependencies: ((state: S) => unknown)[]
): (state: S) => R {
  let lastArgs: unknown[] | null = null;
  let lastResult: R | null = null;

  return (state: S): R => {
    const newArgs = dependencies.length > 0 ? dependencies.map((dep) => dep(state)) : [state];

    if (
      lastArgs !== null &&
      lastArgs.length === newArgs.length &&
      lastArgs.every((arg, i) => arg === newArgs[i])
    ) {
      return lastResult as R;
    }

    lastArgs = newArgs;
    lastResult = selector(state);
    return lastResult;
  };
}

/**
 * Creates an action creator function
 */
export function createAction<P = void, M = void>(type: string) {
  function actionCreator(payload: P, meta?: M): Action<P> {
    return { type, payload, meta: meta as Record<string, unknown> };
  }
  actionCreator.type = type;
  return actionCreator;
}

/**
 * Persists state to local storage
 */
export function persistState(key: string, state: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to persist state to localStorage:', e);
  }
}

/**
 * Loads state from local storage
 */
export function loadState<T>(key: string): T | undefined {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState) as T;
  } catch (e) {
    console.error('Failed to load state from localStorage:', e);
    return undefined;
  }
}
