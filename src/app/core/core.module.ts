import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../../environments/environment';
import { AppEffects } from '../app.effects';
import { AuthModule } from '../auth/auth.module';
import { ReducersModule } from '../reducers/reducers.module';
import { APP_ENVIRONMENT } from '../tokens';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    HttpClientModule,
    // ngrx
    ReducersModule,
    EffectsModule.forRoot([AppEffects]),
    // Features
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
