import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Authenticate = '[Auth] Authenticate',
  AuthenticateSuccess = '[Auth] Authenticate Success',
  AuthenticateError = '[Auth] Authenticate Error',
  Logout = '[Auth] Logout',
}

export type AuthCredentials = Readonly<{ email: string; password: string }>;

export type AuthToken = Readonly<{
  accessToken: string;
}>;

export class Authenticate implements Action {
  readonly type = AuthActionTypes.Authenticate;
  payload: AuthCredentials;

  constructor(email: string, password: string) {
    this.payload = { email, password };
  }
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthActionTypes.AuthenticateSuccess;

  constructor(public payload: AuthToken) {}
}

export class AuthenticateError implements Action {
  readonly type = AuthActionTypes.AuthenticateError;

  constructor(public payload: HttpErrorResponse) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions = Authenticate | AuthenticateSuccess | AuthenticateError | Logout;
