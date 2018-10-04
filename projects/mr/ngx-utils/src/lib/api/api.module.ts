import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { APP_ENVIRONMENT } from '../tokens';
import { Environment } from '../types';
import { ApiRequestEffects } from './effects/api-request.effects';
import { API_TOKEN_SELECTOR } from './tokens';
import { ApiTokenSelectorConstructor } from './types';

@NgModule({
  imports: [CommonModule, HttpClientModule, EffectsModule.forFeature([ApiRequestEffects])],
  declarations: [],
})
export class ApiModule {
  public static forRoot(
    selector: ApiTokenSelectorConstructor,
    env: Environment
  ): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        { provide: API_TOKEN_SELECTOR, useClass: selector },
        { provide: APP_ENVIRONMENT, useValue: env },
      ],
    };
  }
}
