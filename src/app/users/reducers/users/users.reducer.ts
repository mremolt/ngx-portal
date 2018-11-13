import { createCollectionAdapter } from '@mr/ngx-utils';

import { UserDto } from './user.dto';
import { userSchema } from './user.schema';
import { UsersActionTypes, UsersActions } from './users.actions';

export const usersAdapter = createCollectionAdapter<UserDto>(userSchema);

export const initialState = usersAdapter.initialState;

export type State = Readonly<typeof initialState>;

export function reducer(state = initialState, action: UsersActions): State {
  switch (action.type) {
    case UsersActionTypes.LoadUsersStart:
      return { ...initialState, loading: true, loaded: false };

    case UsersActionTypes.LoadUsersSuccess:
      return { ...usersAdapter.reducers.upsertMany(state, action.payload, false), loaded: true };

    case UsersActionTypes.LoadUsersError:
      return { ...initialState, error: action.payload };

    default:
      return state;
  }
}
