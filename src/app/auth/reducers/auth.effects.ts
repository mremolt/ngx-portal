import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Go } from '@mr/ngx-utils';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, flatMap, map, mapTo } from 'rxjs/operators';

import { Environment } from '../../../environments/environment';
import { APP_ENVIRONMENT } from '../../tokens';
import {
  AuthActionTypes,
  AuthToken,
  Authenticate,
  AuthenticateError,
  AuthenticateSuccess,
  Logout,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authenticate$ = this.actions$.pipe(
    ofType<Authenticate>(AuthActionTypes.Authenticate),
    flatMap(action =>
      this.http.post<AuthToken>(`${this.env.apiUrl}/auth/login`, action.payload).pipe(
        map(data => new AuthenticateSuccess(data)),
        catchError(e => of(new AuthenticateError(e)))
      )
    )
  );

  @Effect()
  redirectAfterLogin$ = this.actions$.pipe(
    ofType<AuthenticateSuccess>(AuthActionTypes.AuthenticateSuccess),
    mapTo(new Go({ path: ['dashboard'] }))
  );

  @Effect()
  redirectAfterLogout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    mapTo(new Go({ path: ['/'] }))
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    @Inject(APP_ENVIRONMENT) private env: Environment
  ) {}
}
