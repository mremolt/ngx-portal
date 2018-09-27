import { HttpErrorResponse } from '@angular/common/http';

import { AuthActionTypes, AuthActions } from './auth.actions';

export const initialState = {
  loading: false,
  token: { accessToken: '' },
  error: null as HttpErrorResponse | null,
};

export type State = typeof initialState;

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Authenticate:
      return { ...state, loading: true };

    case AuthActionTypes.AuthenticateSuccess:
      return { ...initialState, token: action.payload };

    case AuthActionTypes.AuthenticateError:
      return { ...initialState, error: action.payload };

    case AuthActionTypes.Logout:
      return initialState;
  }
  return state;
}
