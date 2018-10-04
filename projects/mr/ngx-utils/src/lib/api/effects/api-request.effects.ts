import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, concat, of } from 'rxjs';
import { catchError, filter, flatMap, map, share, take } from 'rxjs/operators';

import { APP_ENVIRONMENT } from '../../tokens';
import { Environment } from '../../types';
import { ApiError, ApiRequest, ApiRequestActionTypes } from '../actions/api-request.actions';
import { API_TOKEN_SELECTOR } from '../tokens';
import { ApiTokenSelector } from '../types';

export function buildApiHttpRequest<T>(
  baseRequest: HttpRequest<T>,
  env: Environment,
  token: string
) {
  return baseRequest.clone({
    url: `${env.apiUrl}/${baseRequest.url}`,
    setHeaders: { Authorization: `Bearer ${token}` },
  });
}

@Injectable()
export class ApiRequestEffects {
  @Effect()
  processApiRequest$ = this.actions$.pipe(
    ofType<ApiRequest>(ApiRequestActionTypes.ApiRequest),
    flatMap(action => {
      const baseRequest = action.payload.request;
      const actions = action.payload.actions;

      return this.store.pipe(
        select(this.tokenSelector.select),
        take(1),
        flatMap(token => {
          const req = buildApiHttpRequest(baseRequest, this.env, token);

          return concat(
            of(new actions.start()),
            this.http.request(req).pipe(
              filter<any>(res => res instanceof HttpResponse),
              map((res: HttpResponse<any>) => res.body),
              map(data => new actions.success(data)),
              catchError(e => of(new actions.error(e), new ApiError(e)))
            ),
            actions.complete ? of(new actions.complete()) : EMPTY
          );
        })
      );
    }),
    share()
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<any>,
    @Inject(API_TOKEN_SELECTOR) private tokenSelector: ApiTokenSelector,
    @Inject(APP_ENVIRONMENT) private env: Environment
  ) {}
}
