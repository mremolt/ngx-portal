import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { ApiActions, ApiRequestConfig } from '../types';

export enum ApiRequestActionTypes {
  ApiRequest = '[API] Request',
  ApiError = '[API] Error',
}

export class ApiRequest<T = any> implements Action {
  public readonly type = ApiRequestActionTypes.ApiRequest;

  constructor(public payload: ApiRequestConfig<T>) {}
}

export class ApiError implements Action {
  public readonly type = ApiRequestActionTypes.ApiError;

  constructor(public payload: HttpErrorResponse) {}
}

export class ApiGetAction<T> extends ApiRequest {
  constructor(url: string, actions: ApiActions<T>) {
    const request = new HttpRequest<T>('GET', url);
    super({ request, actions });
  }
}

export class ApiPostAction<T> extends ApiRequest {
  constructor(url: string, body: T | null, actions: ApiActions<T>) {
    const request = new HttpRequest<T>('POST', url, body);
    super({ request, actions });
  }
}

export class ApiPutAction<T> extends ApiRequest {
  constructor(url: string, body: T | null, actions: ApiActions<T>) {
    const request = new HttpRequest<T>('PUT', url, body);
    super({ request, actions });
  }
}

export class ApiDeleteAction<T> extends ApiRequest {
  constructor(url: string, actions: ApiActions<T>) {
    const request = new HttpRequest<T>('DELETE', url);
    super({ request, actions });
  }
}
