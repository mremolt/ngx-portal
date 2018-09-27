import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Authenticate, Logout } from '../../auth/reducers/auth.actions';
import { AuthState, selectAuthenticated, selectError } from '../../auth/reducers/auth.selectors';

@Component({
  selector: 'mr-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public authenticated$: Observable<boolean>;
  public error$: Observable<HttpErrorResponse | null>;
  public form: FormGroup;

  constructor(private store: Store<AuthState>, fb: FormBuilder) {
    this.authenticated$ = this.store.pipe(select(selectAuthenticated));
    this.error$ = this.store.pipe(select(selectError));

    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }

  public login() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.store.dispatch(new Authenticate(email, password));
    }
  }
}
