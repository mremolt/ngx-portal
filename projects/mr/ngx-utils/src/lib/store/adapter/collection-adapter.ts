import { schema } from 'normalizr';

import { remove, removeMany, updateEmbedded, upsertFactory, upsertManyFactory } from './reducers';
import { CollectionState } from './types';

export function buildCollectionState<Entity extends object>(): CollectionState<Entity> {
  return {
    entities: { collection: {} },
    result: [],
    selected: null,
    loading: false,
    loaded: false,
    dirty: false,
    updatedAt: null,
    error: null,
  };
}

export function createCollectionAdapter<Entity extends object>(entitySchema: schema.Entity) {
  type State = CollectionState<Entity>;

  const initialState = buildCollectionState<Entity>();

  const reducers = {
    upsert: upsertFactory(entitySchema),
    upsertMany: upsertManyFactory(entitySchema),
    updateEmbedded,
    remove,
    removeMany,

    reset(_state: State) {
      return initialState;
    },
  };

  return { initialState, reducers };
}
