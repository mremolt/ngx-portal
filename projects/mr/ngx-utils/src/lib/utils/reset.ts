import { Action, ActionReducer } from '@ngrx/store';

export const APP_RESET = '[Application] Reset State';

export class AppReset implements Action {
  public readonly type = APP_RESET;
}

export function resetMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    if (action.type === APP_RESET) {
      return reducer(undefined, action);
    }

    return reducer(state, action);
  };
}
