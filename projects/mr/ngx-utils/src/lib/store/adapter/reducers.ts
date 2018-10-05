import { normalize, schema } from 'normalizr';

import { mergeNormalizedEntities, removeProp, removeProps } from './helpers';
import { CollectionState, NormalizedEntities } from './types';

export function upsertFactory<Entity extends object>(entitySchema: schema.Entity) {
  return function(
    state: CollectionState<Entity>,
    entity: Entity,
    dirty = true
  ): CollectionState<Entity> {
    const normalized: { result: string; entities: NormalizedEntities<Entity> } = normalize(
      entity,
      entitySchema
    );
    const entities = mergeNormalizedEntities(state.entities, normalized.entities);

    return { ...state, dirty, result: [...state.result, String(normalized.result)], entities };
  };
}

export function upsertManyFactory<Entity extends object>(entitySchema: schema.Entity) {
  return function(
    state: CollectionState<Entity>,
    addEntities: Entity[],
    dirty = true
  ): CollectionState<Entity> {
    const normalized: { result: string[]; entities: NormalizedEntities<Entity> } = normalize(
      addEntities,
      new schema.Array(entitySchema)
    );

    const entities = mergeNormalizedEntities(state.entities, normalized.entities);
    const ids = normalized.result.map(id => String(id));

    return { ...state, dirty, result: [...state.result, ...ids], entities };
  };
}

export function remove<Entity extends object>(
  state: CollectionState<Entity>,
  deleteId: string,
  dirty = true
): CollectionState<Entity> {
  const entities = {
    ...state.entities,
    collection: removeProp(state.entities.collection, deleteId),
  };
  return { ...state, dirty, result: state.result.filter(id => id !== deleteId), entities };
}

export function removeMany<Entity extends object>(
  state: CollectionState<Entity>,
  deleteIds: string[],
  dirty = true
): CollectionState<Entity> {
  const entities = {
    ...state.entities,
    collection: removeProps(state.entities.collection, deleteIds),
  };
  return { ...state, dirty, result: state.result.filter(id => deleteIds.includes(id)), entities };
}

export function updateEmbedded<Entity extends object>(
  state: CollectionState<Entity>,
  collectionName: string,
  embeddedEntity: any,
  dirty = true
): CollectionState<Entity> {
  if (!state.entities[collectionName]) {
    throw new TypeError(`Collection ${collectionName} does not exist on state`);
  }
  if (!state.entities[collectionName][embeddedEntity.id]) {
    throw new TypeError(
      `Entity with ID ${embeddedEntity.id} does not exist on collection ${collectionName}`
    );
  }

  const change = {
    [collectionName]: {
      ...state.entities[collectionName],
      [String(embeddedEntity.id)]: embeddedEntity,
    },
  };

  return { ...state, dirty, entities: { ...state.entities, ...change } };
}
