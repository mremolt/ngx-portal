import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, Subject } from 'rxjs';

import { APP_ENVIRONMENT } from '../../tokens';
import { Authenticate, AuthenticateError, AuthenticateSuccess } from './auth.actions';
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
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('authenticate$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
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
});
