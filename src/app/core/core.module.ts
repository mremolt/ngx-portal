import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { APP_ENVIRONMENT, ApiModule, RouterModule } from '@mr/ngx-utils';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../../environments/environment';
import { AppEffects } from '../app.effects';
import { AuthModule } from '../auth/auth.module';
import { TokenSelector } from '../auth/reducers/auth.selectors';
import { ReducersModule } from '../reducers/reducers.module';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    HttpClientModule,
    // ngrx
    ReducersModule,
    EffectsModule.forRoot([AppEffects]),
    // Features
    RouterModule,
    ApiModule.forRoot(TokenSelector, environment),
    AuthModule,
  ],
  declarations: [],
  providers: [
    {
      provide: APP_ENVIRONMENT,
      useValue: environment,
    },
  ],
})
export class CoreModule {}
