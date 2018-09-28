import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AuthState, selectAuthenticated } from './auth.selectors';

@Injectable()
export class AuthGuard implements CanActivateChild, CanActivate, CanLoad {
  constructor(private store: Store<AuthState>) {}

  public canActivate() {
    return this.testAuth();
  }

  public canActivateChild() {
    return this.testAuth();
  }

  public canLoad() {
    return this.testAuth();
  }

  private testAuth() {
    return this.store.pipe(select(selectAuthenticated));
  }
}
