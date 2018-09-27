import { Authenticate, AuthenticateError, AuthenticateSuccess, Logout } from './auth.actions';
import { initialState, reducer } from './auth.reducer';

describe('Auth Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });

    it('should return the initial state on undefined state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('Authenticate action', () => {
    it('should set loading to true', () => {
      const action = new Authenticate('test', 'pass');

      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('AuthenticateSuccess action', () => {
    it('should set token', () => {
      const action = new AuthenticateSuccess({ accessToken: '12345' });

      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('AuthenticateError action', () => {
    it('should set error', () => {
      const action = new AuthenticateError('payload' as any);

      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });

    it('should empty token', () => {
      const action = new AuthenticateError('payload' as any);
      const currentState = { ...initialState, token: { accessToken: '12345' } };

      const result = reducer(currentState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Logout action', () => {
    it('should set initialState', () => {
      const action = new Logout();
      const currentState = { ...initialState, token: { accessToken: '12345' } };

      const result = reducer(currentState, action);

      expect(result).toBe(initialState);
    });
  });
});
