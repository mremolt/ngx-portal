import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './router.effects';

@NgModule({
  imports: [EffectsModule.forFeature([RouterEffects])],
})
export class RouterModule {}
