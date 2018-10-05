import { NormalizedEntities } from './types';

export function mergeNormalizedEntities<Entity extends object>(
  currentEntities: NormalizedEntities<Entity>,
  newEntities: NormalizedEntities<Entity>
): NormalizedEntities<Entity> {
  return Object.keys(newEntities).reduce((result, key) => {
    const keyResult = { ...currentEntities[key], ...newEntities[key] };
    return { ...result, [key]: keyResult };
  }, {});
}

export function removeProps<T extends { [key: string]: any }>(obj: T, propNames: Array<keyof T>) {
  return Object.keys(obj).reduce((result, key: string) => {
    if (propNames.includes(key)) {
      return result;
    } else {
      return { ...result, [key]: obj[key] };
    }
  }, {});
}

export function removeProp<T extends { [key: string]: any }>(obj: T, propName: keyof T) {
  return removeProps(obj, [propName]);
}
