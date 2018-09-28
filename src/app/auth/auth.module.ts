import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthEffects } from './reducers/auth.effects';
import { AuthGuard } from './reducers/auth.guard';
import * as fromAuth from './reducers/auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [],
  providers: [AuthGuard],
})
export class AuthModule {}
