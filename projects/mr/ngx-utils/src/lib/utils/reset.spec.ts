import { Action, ActionReducer } from '@ngrx/store';

import { AppReset, resetMetaReducer } from './reset';

describe('App reset', () => {
  describe('AppReset', () => {
    it('builds the correct action', () => {
      const action = new AppReset();
      expect(action).toMatchSnapshot();
    });
  });

  describe('resetMetaReducer', () => {
    let reducer: ActionReducer<any>;
    let mockReducer: any;
    const anyAction: Action = { type: 'TEST' };
    const anyState: any = { number: 42 };

    beforeEach(() => {
      mockReducer = jest.fn().mockImplementation((state: any, _action: any) => state);
      reducer = resetMetaReducer(mockReducer);
    });

    it('calls the given reducer with undefined state', () => {
      const newState = reducer(anyState, new AppReset());
      expect(mockReducer).toHaveBeenCalledWith(undefined, expect.any(AppReset));
      expect(newState).toBeUndefined();
    });

    it('calls the given reducer with given state', () => {
      const newState = reducer(anyState, anyAction);
      expect(mockReducer).toHaveBeenCalledWith(anyState, anyAction);
      expect(newState).toBe(anyState);
    });
  });
});
