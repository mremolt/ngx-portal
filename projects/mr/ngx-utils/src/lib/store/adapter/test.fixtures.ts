import { schema } from 'normalizr';

import { buildCollectionState } from './collection-adapter';

export interface User {
  id: string;
  firstname: string;
  lastname: string;

  planet: {
    id: string;
    name: string;
  };

  hobbies: Array<{ id: string; name: string }>;
}

export const planetSchema = new schema.Entity('planets');
export const hobbySchema = new schema.Entity('hobbies');
export const userSchema = new schema.Entity('collection', {
  planet: planetSchema,
  hobbies: [hobbySchema],
});

export const testInitialState = buildCollectionState<User>();

export const user1: User = {
  id: '42',
  firstname: 'Arthur',
  lastname: 'Dent',
  planet: {
    id: '43',
    name: 'Earth',
  },
  hobbies: [
    {
      id: '12',
      name: 'Drinking tea',
    },
    { id: '13', name: 'Carrying towels' },
  ],
};

export const user2: User = {
  id: '45',
  firstname: 'Tricia',
  lastname: 'McMillan',
  planet: {
    id: '43',
    name: 'Earth',
  },
  hobbies: [
    {
      id: '12',
      name: 'Drinking tea',
    },
  ],
};

export const user3: User = {
  id: '46',
  firstname: 'Ford',
  lastname: 'Perfect',
  planet: {
    id: '44',
    name: 'Beteigeuze',
  },
  hobbies: [{ id: '13', name: 'Carrying towels' }],
};

export const users: { [key: string]: User } = { user1, user2, user3 };
