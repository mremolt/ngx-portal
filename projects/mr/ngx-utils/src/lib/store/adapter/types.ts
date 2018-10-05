import { DeepReadonly } from 'utility-types';

export type NormalizedEntities<Entity extends object> = DeepReadonly<{
  collection: { [key: string]: Entity };
  [key: string]: { [key: string]: object };
}>;

export type CollectionState<Entity extends object> = DeepReadonly<{
  entities: NormalizedEntities<Entity>;
  result: string[];
  selected: string | null;
  loading: boolean;
  loaded: boolean;
  dirty: boolean;
  updatedAt: Date | null;
}>;
