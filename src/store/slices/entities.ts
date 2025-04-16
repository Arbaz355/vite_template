/**
 * Entities Slice
 *
 * This file contains the entities state reducer and actions.
 * It handles normalized entities in a generic way.
 */

import { Action, EntitiesState } from '../types';
import { createAction } from '../utils';
import { initialState } from '../context';

// Define entity interface
interface EntityWithId {
  id?: string;
  _id?: string;
  [key: string]: unknown;
}

// For typed entity state operations
interface EntityState {
  byId: Record<string, unknown>;
  allIds: string[];
  loading: boolean;
  error: Error | null;
  metadata: {
    lastFetched: number | null;
    totalCount: number | null;
  };
}

// Action types
export const ENTITIES_REQUEST = 'entities/request';
export const ENTITIES_SUCCESS = 'entities/success';
export const ENTITIES_FAILURE = 'entities/failure';
export const ENTITY_ADD = 'entities/add';
export const ENTITY_UPDATE = 'entities/update';
export const ENTITY_REMOVE = 'entities/remove';
export const ENTITIES_CLEAR = 'entities/clear';
export const ENTITIES_SET_METADATA = 'entities/set_metadata';

// Action creators
export const entitiesRequest = createAction<{ entityType: string }>(ENTITIES_REQUEST);

export const entitiesSuccess = createAction<{
  entityType: string;
  entities: Record<string, unknown>;
  totalCount?: number;
}>(ENTITIES_SUCCESS);

export const entitiesFailure = createAction<{
  entityType: string;
  error: Error;
}>(ENTITIES_FAILURE);

export const entityAdd = createAction<{
  entityType: string;
  entity: EntityWithId;
}>(ENTITY_ADD);

export const entityUpdate = createAction<{
  entityType: string;
  id: string;
  changes: unknown;
}>(ENTITY_UPDATE);

export const entityRemove = createAction<{
  entityType: string;
  id: string;
}>(ENTITY_REMOVE);

export const entitiesClear = createAction<{
  entityType: string;
}>(ENTITIES_CLEAR);

export const entitiesSetMetadata = createAction<{
  entityType: string;
  metadata: {
    lastFetched?: number;
    totalCount?: number;
  };
}>(ENTITIES_SET_METADATA);

// Helper functions
function getInitialEntityState(): EntityState {
  return {
    byId: {},
    allIds: [],
    loading: false,
    error: null,
    metadata: {
      lastFetched: null,
      totalCount: null,
    },
  };
}

// Reducer
export function entitiesReducer(
  state: EntitiesState = initialState.entities,
  action: Action
): EntitiesState {
  switch (action.type) {
    case ENTITIES_REQUEST: {
      const { entityType } = action.payload as { entityType: string };
      return {
        ...state,
        [entityType]: {
          ...(state[entityType] || getInitialEntityState()),
          loading: true,
          error: null,
        },
      };
    }

    case ENTITIES_SUCCESS: {
      const { entityType, entities, totalCount } = action.payload as {
        entityType: string;
        entities: Record<string, unknown>;
        totalCount?: number;
      };

      const ids = Object.keys(entities);
      const existingState = state[entityType] || getInitialEntityState();

      return {
        ...state,
        [entityType]: {
          ...existingState,
          byId: { ...entities },
          allIds: ids,
          loading: false,
          error: null,
          metadata: {
            ...existingState.metadata,
            lastFetched: Date.now(),
            totalCount:
              totalCount !== undefined ? totalCount : existingState.metadata.totalCount || null,
          },
        },
      };
    }

    case ENTITIES_FAILURE: {
      const { entityType, error } = action.payload as {
        entityType: string;
        error: Error;
      };

      const existingState = state[entityType] || getInitialEntityState();

      return {
        ...state,
        [entityType]: {
          ...existingState,
          loading: false,
          error,
        },
      };
    }

    case ENTITY_ADD: {
      const { entityType, entity } = action.payload as {
        entityType: string;
        entity: EntityWithId;
      };

      const id = entity.id || entity._id;
      if (!id) return state;

      const existingState = state[entityType] || getInitialEntityState();

      return {
        ...state,
        [entityType]: {
          ...existingState,
          byId: {
            ...existingState.byId,
            [id]: entity,
          },
          allIds: existingState.allIds.includes(id)
            ? existingState.allIds
            : [...existingState.allIds, id],
        },
      };
    }

    case ENTITY_UPDATE: {
      const { entityType, id, changes } = action.payload as {
        entityType: string;
        id: string;
        changes: unknown;
      };

      const existingState = state[entityType];
      if (!existingState || !existingState.byId[id]) return state;

      // Create a merged entity
      const existingEntity = existingState.byId[id] as Record<string, unknown>;
      const updatedEntity: Record<string, unknown> = {};

      // Copy existing properties
      for (const key in existingEntity) {
        if (Object.prototype.hasOwnProperty.call(existingEntity, key)) {
          updatedEntity[key] = existingEntity[key];
        }
      }

      // Apply changes
      const changesObj = changes as Record<string, unknown>;
      for (const key in changesObj) {
        if (Object.prototype.hasOwnProperty.call(changesObj, key)) {
          updatedEntity[key] = changesObj[key];
        }
      }

      return {
        ...state,
        [entityType]: {
          ...existingState,
          byId: {
            ...existingState.byId,
            [id]: updatedEntity,
          },
        },
      };
    }

    case ENTITY_REMOVE: {
      const { entityType, id } = action.payload as {
        entityType: string;
        id: string;
      };

      const existingState = state[entityType];
      if (!existingState || !existingState.byId[id]) return state;

      // Create new byId object without the removed entity
      const newById: Record<string, unknown> = {};
      Object.keys(existingState.byId).forEach((key) => {
        if (key !== id) {
          newById[key] = existingState.byId[key];
        }
      });

      return {
        ...state,
        [entityType]: {
          ...existingState,
          byId: newById,
          allIds: existingState.allIds.filter((existingId) => existingId !== id),
        },
      };
    }

    case ENTITIES_CLEAR: {
      const { entityType } = action.payload as { entityType: string };

      if (!state[entityType]) return state;

      return {
        ...state,
        [entityType]: getInitialEntityState(),
      };
    }

    case ENTITIES_SET_METADATA: {
      const { entityType, metadata } = action.payload as {
        entityType: string;
        metadata: {
          lastFetched?: number;
          totalCount?: number;
        };
      };

      const existingState = state[entityType] || getInitialEntityState();

      return {
        ...state,
        [entityType]: {
          ...existingState,
          metadata: {
            ...existingState.metadata,
            ...metadata,
          },
        },
      };
    }

    default:
      return state;
  }
}
