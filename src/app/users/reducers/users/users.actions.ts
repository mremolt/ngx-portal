import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ApiErrorAction, ApiRequest, ApiStartAction, ApiSuccessAction } from '@mr/ngx-utils';

import { UserDto } from './user.dto';

export enum UsersActionTypes {
  LoadUsersStart = '[Users] Load Users Start',
  LoadUsersSuccess = '[Users] Load Users Success',
  LoadUsersError = '[Users] Load Users Error',
}

export class LoadUsersStart implements ApiStartAction {
  public readonly type = UsersActionTypes.LoadUsersStart;
  constructor(public payload?: any) {}
}

export class LoadUsersSuccess implements ApiSuccessAction<UserDto[]> {
  public readonly type = UsersActionTypes.LoadUsersSuccess;
  constructor(public payload: UserDto[]) {}
}

export class LoadUsersError implements ApiErrorAction {
  public readonly type = UsersActionTypes.LoadUsersError;
  constructor(public payload: HttpErrorResponse) {}
}

export class LoadUsers extends ApiRequest {
  constructor() {
    super({
      actions: { start: LoadUsersStart, success: LoadUsersSuccess, error: LoadUsersError },
      request: new HttpRequest('GET', 'users'),
    });
  }
}

export type UsersActions = LoadUsersStart | LoadUsersSuccess | LoadUsersError | LoadUsers;
