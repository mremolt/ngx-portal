import { RouterAction, RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface RootState {
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<RootState, RouterAction<any>> = {
  router: routerReducer,
};
