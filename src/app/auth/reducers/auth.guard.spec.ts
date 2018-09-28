import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { AuthenticateSuccess } from './auth.actions';
import { AuthGuard } from './auth.guard';
import { reducer } from './auth.reducer';
import { AuthState } from './auth.selectors';

describe('AuthGuard', () => {
  let subject: AuthGuard;
  let store: Store<AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ auth: reducer } as any)],
      providers: [AuthGuard],
    });

    subject = TestBed.get(AuthGuard);
    store = TestBed.get(Store);
  });

  it('creates', () => {
    expect(subject).toBeTruthy();
    expect(subject).toBeInstanceOf(AuthGuard);
  });

  describe('canActivate', () => {
    it('returns false without token', done => {
      subject.canActivate().subscribe(isAuthenticated => {
        expect(isAuthenticated).toBeFalsy();
        done();
      });
    });

    it('returns true with token in state', done => {
      store.dispatch(new AuthenticateSuccess({ accessToken: 'entry' }));

      subject.canActivate().subscribe(isAuthenticated => {
        expect(isAuthenticated).toBeTruthy();
        done();
      });
    });
  });

  describe('canActivateChild', () => {
    it('returns false without token', done => {
      subject.canActivateChild().subscribe(isAuthenticated => {
        expect(isAuthenticated).toBeFalsy();
        done();
      });
    });

    it('returns true with token in state', done => {
      store.dispatch(new AuthenticateSuccess({ accessToken: 'entry' }));

      subject.canActivateChild().subscribe(isAuthenticated => {
        expect(isAuthenticated).toBeTruthy();
        done();
      });
    });
  });

  describe('canLoad', () => {
    it('returns false without token', done => {
      subject.canLoad().subscribe(isAuthenticated => {
        expect(isAuthenticated).toBeFalsy();
        done();
      });
    });

    it('returns true with token in state', done => {
      store.dispatch(new AuthenticateSuccess({ accessToken: 'entry' }));

      subject.canLoad().subscribe(isAuthenticated => {
        expect(isAuthenticated).toBeTruthy();
        done();
      });
    });
  });
});
