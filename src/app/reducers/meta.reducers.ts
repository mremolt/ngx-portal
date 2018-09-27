import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { storeLogger } from 'ngrx-store-logger';

import { environment } from '../../environments/environment';
import { RootState } from './root.reducer';

export function logger(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return storeLogger({ collapsed: true })(reducer);
}

export function localStorageSyncReducer(
  reducer: ActionReducer<RootState>
): ActionReducer<RootState> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<RootState>[] = environment.production
  ? [localStorageSyncReducer]
  : [logger, localStorageSyncReducer];
