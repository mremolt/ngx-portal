import { HttpErrorResponse } from '@angular/common/http';

import {
  AuthState,
  TokenSelector,
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
    it('returns loading', () => {
      expect(selectLoading(state)).toMatchSnapshot();
    });
  });

  describe('selectToken', () => {
    it('returns token', () => {
      expect(selectToken(state)).toMatchSnapshot();
    });
  });

  describe('selectError', () => {
    it('returns error', () => {
      expect(selectError(state)).toMatchSnapshot();
    });
  });

  describe('selectAuthenticated', () => {
    it('returns if user is authenticated', () => {
      expect(selectAuthenticated(state)).toMatchSnapshot();
    });
  });

  describe('TokenSelector', () => {
    let subject: TokenSelector;

    beforeEach(() => {
      subject = new TokenSelector();
    });

    it('returns token', () => {
      expect(subject.select(state)).toMatchSnapshot();
    });
  });
});
