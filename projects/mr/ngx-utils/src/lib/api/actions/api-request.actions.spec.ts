import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { ApiErrorAction, ApiStartAction, ApiSuccessAction } from '../types';
import {
  ApiDeleteAction,
  ApiError,
  ApiGetAction,
  ApiPostAction,
  ApiPutAction,
  ApiRequest,
} from './api-request.actions';

export class FetchUsersStart implements ApiStartAction {
  public readonly type = '[Users] Fetch Start';
  constructor(public payload: any) {}
}

export class FetchUsersSuccess<T> implements ApiSuccessAction<T> {
  public readonly type = '[Users] Fetch Success';
  constructor(public payload: T) {}
}

export class FetchUsersError implements ApiErrorAction {
  public readonly type = '[Users] Fetch Error';
  constructor(public payload: HttpErrorResponse) {}
}

export class FetchUsersComplete implements Action {
  public readonly type = '[Users] Fetch Complete';
}

describe('ApiRequest Actions', () => {
  describe('ApiRequest', () => {
    it('builds the correct action', () => {
      const action = new ApiRequest({
        request: new HttpRequest('GET', 'users'),
        actions: {
          start: FetchUsersStart,
          success: FetchUsersSuccess,
          error: FetchUsersError,
          complete: FetchUsersComplete,
        },
      });
      expect(action).toBeTruthy();
      expect(action).toMatchSnapshot();
    });
  });

  describe('ApiError', () => {
    it('builds the correct action', () => {
      const action = new ApiError(new HttpErrorResponse({}));
      expect(action).toBeTruthy();
      expect(action).toMatchSnapshot();
    });
  });

  describe('ApiGetAction', () => {
    it('builds the correct action', () => {
      const action = new ApiGetAction('users', {
        start: FetchUsersStart,
        success: FetchUsersSuccess,
        error: FetchUsersError,
        complete: FetchUsersComplete,
      });
      expect(action).toBeTruthy();
      expect(action).toMatchSnapshot();
    });
  });

  describe('ApiPostAction', () => {
    it('builds the correct action', () => {
      const action = new ApiPostAction(
        'users',
        { id: 42 },
        {
          start: FetchUsersStart,
          success: FetchUsersSuccess,
          error: FetchUsersError,
          complete: FetchUsersComplete,
        }
      );
      expect(action).toBeTruthy();
      expect(action).toMatchSnapshot();
    });
  });

  describe('ApiPutAction', () => {
    it('builds the correct action', () => {
      const action = new ApiPutAction(
        'users',
        { id: 42 },
        {
          start: FetchUsersStart,
          success: FetchUsersSuccess,
          error: FetchUsersError,
          complete: FetchUsersComplete,
        }
      );
      expect(action).toBeTruthy();
      expect(action).toMatchSnapshot();
    });
  });

  describe('ApiDeleteAction', () => {
    it('builds the correct action', () => {
      const action = new ApiDeleteAction('users', {
        start: FetchUsersStart,
        success: FetchUsersSuccess,
        error: FetchUsersError,
        complete: FetchUsersComplete,
      });
      expect(action).toBeTruthy();
      expect(action).toMatchSnapshot();
    });
  });
});
