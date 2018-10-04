import { ApiTokenSelector } from '@mr/ngx-utils';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RootState } from '../../reducers/root.reducer';
import { State } from './auth.reducer';

export interface AuthState extends RootState {
  auth: State;
}

export const selectAuth = createFeatureSelector<AuthState, State>('auth');

export const selectLoading = createSelector([selectAuth], state => state.loading);

export const selectToken = createSelector([selectAuth], state => state.token.accessToken);

export const selectError = createSelector([selectAuth], state => state.error);

export const selectAuthenticated = createSelector([selectToken], state => !!state);

export class TokenSelector implements ApiTokenSelector {
  public select(state: AuthState) {
    return selectToken(state);
  }
}
