import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducerMap, META_REDUCERS, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';

import { metaReducers } from './meta.reducers';
import { RootState, reducers } from './root.reducer';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<RootState>>('Registered Reducers');

export function getReducers() {
  return reducers;
}

export function getMetaReducers(): MetaReducer<RootState>[] {
  return metaReducers;
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(REDUCER_TOKEN),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: REDUCER_TOKEN,
      useFactory: getReducers,
    },
    {
      provide: META_REDUCERS,
      useFactory: getMetaReducers,
    },
  ],
})
export class ReducersModule {}
