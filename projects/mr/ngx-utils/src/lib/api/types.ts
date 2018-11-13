import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Action } from '@ngrx/store';

export interface Constructor<T> {
  new (...args: any[]): T;
}

export interface ApiTokenSelector {
  select(state: any): string;
}

export interface ApiTokenSelectorConstructor {
  new (): ApiTokenSelector;
}

export interface ApiStartAction extends Action {
  readonly payload?: any;
}

export interface ApiSuccessAction<T> extends Action {
  readonly payload: T;
}

export interface ApiErrorAction extends Action {
  readonly payload: HttpErrorResponse;
}

export type ApiActions<T> = Readonly<{
  start: Constructor<ApiStartAction>;
  success: Constructor<ApiSuccessAction<T>>;
  error: Constructor<ApiErrorAction>;
  complete?: Constructor<Action>;
}>;

export type ApiRequestConfig<T> = Readonly<{
  actions: ApiActions<T>;
  request: HttpRequest<T>;
}>;
