import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromUsers from './reducers/users/users.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('users', fromUsers.reducer),
    // EffectsModule.forFeature([UsersEffects])
  ],
})
export class UsersModule {}
