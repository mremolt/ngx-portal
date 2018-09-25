import { RouterAction, RouterReducerState, routerReducer } from '@ngrx/router-store';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { environment } from '../../environments/environment';

export interface RootState {
  router: RouterReducerState;
}

export interface AnyAction extends Action {
  payload?: any;
  meta?: object;
}

export function logger(reducer: ActionReducer<RootState>): any {
  return storeLogger({ collapsed: true })(reducer);
}

export const reducers: ActionReducerMap<RootState, RouterAction<any>> = {
  router: routerReducer,
};

export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [logger] : [];
