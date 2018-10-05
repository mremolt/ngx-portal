import { createCollectionAdapter } from './collection-adapter';
import { User, userSchema, users } from './test.fixtures';
import { CollectionState } from './types';

const { user1, user2, user3 } = users;

describe('createCollectionAdapter', () => {
  describe('collectionAdapter', () => {
    const subject = createCollectionAdapter<User>(userSchema);

    it('creates the adapter', () => {
      expect(subject).toBeTruthy();
    });

    describe('initialState', () => {
      it('returns the correct structured state', () => {
        expect(subject.initialState).toMatchSnapshot();
      });
    });

    describe('reducers', () => {
      describe('upsert', () => {
        it('adds the entity to an empty state', () => {
          const newState = subject.reducers.upsert(subject.initialState, user1);
          expect(newState).toMatchSnapshot();
        });
      });

      describe('upsertMany', () => {
        it('adds the entities to an empty state', () => {
          const newState = subject.reducers.upsertMany(subject.initialState, [user1, user2]);
          expect(newState).toMatchSnapshot();
        });
      });

      describe('reset', () => {
        it('returns the initialState', () => {
          let newState = subject.reducers.upsertMany(subject.initialState, [user1, user2]);
          expect(newState).not.toBe(subject.initialState);

          newState = subject.reducers.reset(newState);
          expect(newState).toBe(subject.initialState);
        });
      });

      describe('remove', () => {
        it('removes an entity from entities and id from result', () => {
          const currentState = subject.reducers.upsertMany(subject.initialState, [
            user1,
            user2,
            user3,
          ]);
          const newState = subject.reducers.remove(currentState, user2.id);

          expect(newState).not.toEqual(currentState);
          expect(newState).toMatchSnapshot();
        });
      });

      describe('removeMany', () => {
        it('removes selected entities from entities and ids from result', () => {
          const currentState = subject.reducers.upsertMany(subject.initialState, [
            user1,
            user2,
            user3,
          ]);
          const newState = subject.reducers.removeMany(currentState, [user2.id, user1.id]);

          expect(newState).not.toEqual(currentState);
          expect(newState).toMatchSnapshot();
        });
      });

      describe('updateEmbedded', () => {
        let currentState: CollectionState<User>;

        beforeEach(() => {
          currentState = subject.reducers.upsertMany(subject.initialState, [user1, user2]);
        });

        it('updates the embedded entity', () => {
          const newState = subject.reducers.updateEmbedded(currentState, 'hobbies', {
            id: '12',
            name: 'drinking coffee',
          });
          expect(newState).toMatchSnapshot();
        });
      });
    });
  });
});
