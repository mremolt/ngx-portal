import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_ENVIRONMENT, ApiError, AppReset, Go } from '@mr/ngx-utils';
import { provideMockActions } from '@ngrx/effects/testing';
import { EMPTY, ReplaySubject, Subject } from 'rxjs';

import { Authenticate, AuthenticateError, AuthenticateSuccess, Logout } from './auth.actions';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions$: Subject<any>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthEffects,
        { provide: APP_ENVIRONMENT, useValue: { apiUrl: 'http://localhost:3001' } },
        provideMockActions(() => actions$),
      ],
    });

    httpMock = TestBed.get(HttpTestingController);
    effects = TestBed.get(AuthEffects);
    actions$ = new ReplaySubject(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('authenticate$', () => {
    beforeEach(() => {
      actions$.next(new Authenticate('test1@example.com', 'secret'));
    });

    it('emits AuthenticateSuccess on successful HTTP call', done => {
      effects.authenticate$.subscribe(successAction => {
        expect(successAction).toBeInstanceOf(AuthenticateSuccess);
        expect(successAction).toMatchSnapshot();
        done();
      });

      const req = httpMock.expectOne('http://localhost:3001/auth/login');
      expect(req.request.method).toEqual('POST');

      req.flush({ authToken: '1234567890' });
      httpMock.verify();
    });

    it('emits AuthenticateError on error HTTP call', done => {
      effects.authenticate$.subscribe(errorAction => {
        expect(errorAction).toBeInstanceOf(AuthenticateError);
        expect(errorAction).toMatchSnapshot();
        done();
      });

      const req = httpMock.expectOne('http://localhost:3001/auth/login');
      expect(req.request.method).toEqual('POST');

      req.flush('', { status: 403, statusText: 'Nix!' });
      httpMock.verify();
    });
  });

  describe('redirectAfterLogin$', () => {
    beforeEach(() => {
      actions$.next(new AuthenticateSuccess({ accessToken: 'entry' }));
    });

    it('calls Go action redirecting to dashboard', done => {
      effects.redirectAfterLogin$.subscribe(action => {
        expect(action).toBeInstanceOf(Go);
        expect(action).toMatchSnapshot();
        done();
      });
    });
  });

  describe('redirectAfterLogout$', () => {
    beforeEach(() => {
      actions$.next(new Logout());
    });

    it('calls Go action redirecting to root', done => {
      effects.redirectAfterLogout$.subscribe(action => {
        expect(action).toBeInstanceOf(Go);
        expect(action).toMatchSnapshot();
        done();
      });
    });
  });

  describe('resetOnApiErrors$', () => {
    describe('if the error has status 401', () => {
      beforeEach(() => {
        actions$.next(new ApiError(new HttpErrorResponse({ status: 401 })));
      });

      it('emits AppReset action', done => {
        effects.resetOnApiErrors$.subscribe(action => {
          expect(action).toBeInstanceOf(AppReset);
          done();
        });
      });
    });

    describe('if the error does not have status 401', () => {
      beforeEach(() => {
        actions$.next(new ApiError(new HttpErrorResponse({ status: 404 })));
      });

      it('does not emit any action', done => {
        effects.resetOnApiErrors$.subscribe(action => {
          expect(action).toBe(EMPTY);
          done();
        });
      });
    });
  });
});
