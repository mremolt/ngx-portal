import { HttpErrorResponse } from '@angular/common/http';

import {
  AuthState,
  selectAuth,
  selectAuthenticated,
  selectError,
  selectLoading,
  selectToken,
} from './auth.selectors';

describe('auth selectors', () => {
  const state: AuthState = {
    auth: {
      loading: false,
      token: { accessToken: 'entry' },
      error: new HttpErrorResponse({ error: 'ARGH' }),
    },
    router: {} as any,
  };

  describe('selectAuth', () => {
    it('returns auth state', () => {
      expect(selectAuth(state)).toMatchSnapshot();
    });
  });

  describe('selectLoading', () => {
    it('returns sub state', () => {
      expect(selectLoading(state)).toMatchSnapshot();
    });
  });

  describe('selectToken', () => {
    it('returns sub state', () => {
      expect(selectToken(state)).toMatchSnapshot();
    });
  });

  describe('selectError', () => {
    it('returns sub state', () => {
      expect(selectError(state)).toMatchSnapshot();
    });
  });

  describe('selectAuthenticated', () => {
    it('returns sub state', () => {
      expect(selectAuthenticated(state)).toMatchSnapshot();
    });
  });
});
