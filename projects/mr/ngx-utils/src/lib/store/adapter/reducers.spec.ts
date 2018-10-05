import { remove, removeMany, updateEmbedded, upsertFactory, upsertManyFactory } from './reducers';
import { User, testInitialState, userSchema, users } from './test.fixtures';
import { CollectionState } from './types';

const { user1, user2, user3 } = users;

describe('reducers', () => {
  let upsertMany: ReturnType<typeof upsertManyFactory>;

  beforeEach(() => {
    upsertMany = upsertManyFactory(userSchema);
  });

  describe('upsert', () => {
    let upsert: ReturnType<typeof upsertFactory>;

    beforeEach(() => {
      upsert = upsertFactory(userSchema);
      upsertMany = upsertManyFactory(userSchema);
    });

    it('adds the entity to an empty state', () => {
      const newState = upsert(testInitialState, user1);
      expect(newState).toMatchSnapshot();
    });

    it('adds the entity to the given state and merges embedded entities', () => {
      let newState = upsert(testInitialState, user1);

      newState = upsert(newState, user2);
      expect(newState).toMatchSnapshot();

      newState = upsert(newState, user3);
      expect(newState).toMatchSnapshot();
    });

    it('adds does set dirty if specified', () => {
      const newState = upsert(testInitialState, user1, false);
      expect(newState).toMatchSnapshot();
    });

    it('updates an entity already in the state', () => {
      let newState = upsertMany(testInitialState, [user1, user2]);

      const user2Changed = {
        ...user2,
        lastname: 'Dent',
        hobbies: [
          {
            id: '12',
            name: 'Drinking tea together',
          },
        ],
      };

      newState = upsert(newState, user2Changed);
      expect(newState).toMatchSnapshot();
    });
  });

  describe('upsertMany', () => {
    it('adds the entities to an empty state', () => {
      const newState = upsertMany(testInitialState, [user1, user2]);
      expect(newState).toMatchSnapshot();
    });

    it('adds the entities to the given state and merges embedded entities', () => {
      let newState = upsertMany(testInitialState, [user1, user2]);
      expect(newState).toMatchSnapshot();

      newState = upsertMany(newState, [user3]);
      expect(newState).toMatchSnapshot();
    });
  });

  describe('remove', () => {
    it('removes an entity from entities and id from result', () => {
      const currentState = upsertMany(testInitialState, [user1, user2, user3]);
      const newState = remove(currentState, user2.id);

      expect(newState).not.toEqual(currentState);
      expect(newState).toMatchSnapshot();
    });
  });

  describe('removeMany', () => {
    it('removes selected entities from entities and ids from result', () => {
      const currentState = upsertMany(testInitialState, [user1, user2, user3]);
      const newState = removeMany(currentState, [user2.id, user1.id]);

      expect(newState).not.toEqual(currentState);
      expect(newState).toMatchSnapshot();
    });
  });

  describe('updateEmbedded', () => {
    let currentState: CollectionState<User>;

    beforeEach(() => {
      currentState = upsertMany(testInitialState, [user1, user2]);
    });

    it('throws if the collection name does not exist', () => {
      expect(() => {
        updateEmbedded(testInitialState, 'foooo', { id: '42' });
      }).toThrowError('Collection foooo does not exist on state');
    });

    it('throws if the entity does not exist on collection', () => {
      expect(() => {
        updateEmbedded(currentState, 'collection', { id: '41' });
      }).toThrowError('Entity with ID 41 does not exist on collection collection');
    });

    it('does not throw if entity is found', () => {
      expect(() => {
        updateEmbedded(currentState, 'collection', { id: '42' });
      }).not.toThrowError();
    });

    it('updates the embedded entity', () => {
      const newState = updateEmbedded(currentState, 'hobbies', {
        id: '12',
        name: 'drinking coffee',
      });
      expect(newState).toMatchSnapshot();
    });
  });
});
