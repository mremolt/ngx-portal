import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { bufferCount } from 'rxjs/operators';

import { APP_ENVIRONMENT } from '../../tokens';
import { ApiError, ApiRequest } from '../actions/api-request.actions';
import { API_TOKEN_SELECTOR } from '../tokens';
import { ApiActions, ApiErrorAction, ApiStartAction, ApiSuccessAction } from '../types';
import { ApiRequestEffects, buildApiHttpRequest } from './api-request.effects';

class FetchUsersStart implements ApiStartAction {
  public readonly type = '[Users] Fetch Start';
  constructor(public payload: any) {}
}

class FetchUsersSuccess<T> implements ApiSuccessAction<T> {
  public readonly type = '[Users] Fetch Success';
  constructor(public payload: T) {}
}

class FetchUsersError implements ApiErrorAction {
  public readonly type = '[Users] Fetch Error';
  constructor(public payload: HttpErrorResponse) {}
}

class FetchUsersComplete implements Action {
  public readonly type = '[Users] Fetch Complete';
}

const testActions: ApiActions<any> = {
  start: FetchUsersStart,
  success: FetchUsersSuccess,
  error: FetchUsersError,
  complete: FetchUsersComplete,
};

describe('buildApiHttpRequest', () => {
  let subject: HttpRequest<any>;

  beforeEach(() => {
    subject = buildApiHttpRequest(
      new HttpRequest('GET', 'users'),
      { apiUrl: 'http://localhost:4500', production: true },
      'the_token'
    );
  });

  it('prepends the apiUrl to url', () => {
    expect(subject.url).toEqual('http://localhost:4500/users');
  });

  it('sets auth header', () => {
    expect(subject.headers.get('Authorization')).toEqual('Bearer the_token');
  });
});

describe('ApiRequestEffects', () => {
  let httpMock: HttpTestingController;
  let actions$: ReplaySubject<any>;
  let effects: ApiRequestEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiRequestEffects,
        provideMockActions(() => actions$),
        { provide: APP_ENVIRONMENT, useValue: { apiUrl: 'http://localhost:3001' } },
        {
          provide: API_TOKEN_SELECTOR,
          useValue: {
            select() {
              return 'foooo';
            },
          },
        },
      ],
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
    });

    httpMock = TestBed.get(HttpTestingController);
    effects = TestBed.get(ApiRequestEffects);
    actions$ = new ReplaySubject(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('processApiRequest$', () => {
    describe('with complete action', () => {
      beforeEach(() => {
        actions$.next(
          new ApiRequest({ actions: testActions, request: new HttpRequest('GET', 'users') })
        );
      });

      it('fires start, success and complete on 200 request', done => {
        effects.processApiRequest$.pipe(bufferCount(3)).subscribe(actions => {
          const [start, success, complete] = actions;

          expect(start).toBeInstanceOf(FetchUsersStart);
          expect(success).toBeInstanceOf(FetchUsersSuccess);
          expect(complete).toBeInstanceOf(FetchUsersComplete);

          expect(start).toMatchSnapshot();
          expect(success).toMatchSnapshot();
          expect(complete).toMatchSnapshot();
          done();
        });

        const req = httpMock.expectOne('http://localhost:3001/users');
        expect(req.request.method).toEqual('GET');

        req.flush([]);
        httpMock.verify();
      });

      it('fires start, error and complete on 404 request', done => {
        effects.processApiRequest$.pipe(bufferCount(4)).subscribe(actions => {
          const [start, error, apiError, complete] = actions;

          expect(start).toBeInstanceOf(FetchUsersStart);
          expect(error).toBeInstanceOf(FetchUsersError);
          expect(apiError).toBeInstanceOf(ApiError);
          expect(complete).toBeInstanceOf(FetchUsersComplete);

          expect(start).toMatchSnapshot();
          expect(error).toMatchSnapshot();
          expect(apiError).toMatchSnapshot();
          expect(complete).toMatchSnapshot();
          done();
        });

        const req = httpMock.expectOne('http://localhost:3001/users');
        expect(req.request.method).toEqual('GET');

        req.flush(null, { status: 404, statusText: 'Nowhere' });
        httpMock.verify();
      });
    });

    describe('without complete action', () => {
      beforeEach(() => {
        actions$.next(
          new ApiRequest({
            actions: { start: FetchUsersStart, success: FetchUsersSuccess, error: FetchUsersError },
            request: new HttpRequest('GET', 'users'),
          })
        );
      });

      it('fires start, success and complete on 200 request', done => {
        effects.processApiRequest$.pipe(bufferCount(2)).subscribe(actions => {
          const [start, success] = actions;

          expect(start).toBeInstanceOf(FetchUsersStart);
          expect(success).toBeInstanceOf(FetchUsersSuccess);

          expect(start).toMatchSnapshot();
          expect(success).toMatchSnapshot();
          done();
        });

        const req = httpMock.expectOne('http://localhost:3001/users');
        expect(req.request.method).toEqual('GET');

        req.flush([]);
        httpMock.verify();
      });
    });
  });
});
