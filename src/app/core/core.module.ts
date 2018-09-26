import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducerMap, META_REDUCERS, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';
import { AppEffects } from '../app.effects';
import { AuthModule } from '../auth/auth.module';
import { RootState, metaReducers, reducers } from '../reducers';
import { APP_ENVIRONMENT } from '../tokens';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<RootState>>('Registered Reducers');

export function getReducers() {
  return reducers;
}

export function getMetaReducers(): MetaReducer<RootState>[] {
  return metaReducers;
}

@NgModule({
  imports: [
    // Angular
    CommonModule,
    HttpClientModule,
    // ngrx
    StoreModule.forRoot(REDUCER_TOKEN),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    // Features
    AuthModule,
  ],
  declarations: [],
  providers: [
    {
      provide: REDUCER_TOKEN,
      useFactory: getReducers,
    },
    {
      provide: META_REDUCERS,
      useFactory: getMetaReducers,
    },
    {
      provide: APP_ENVIRONMENT,
      useValue: environment,
    },
  ],
})
export class CoreModule {}
