import { LoadUsersError, LoadUsersStart, LoadUsersSuccess } from './users.actions';
import { initialState, reducer } from './users.reducer';

describe('Users Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('undefined state', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('LoadUsersStart', () => {
    it('matches a loading state', () => {
      expect(reducer(initialState, new LoadUsersStart())).toMatchSnapshot();
    });
  });

  describe('LoadUsersSuccess', () => {
    it('matches a success state', () => {
      expect(
        reducer(initialState, new LoadUsersSuccess([{ id: 12, name: 'test user' }] as any))
      ).toMatchSnapshot();
    });
  });

  describe('LoadUsersError', () => {
    it('matches a error state', () => {
      expect(
        reducer(initialState, new LoadUsersError({ message: 'Argh' } as any))
      ).toMatchSnapshot();
    });
  });
});
