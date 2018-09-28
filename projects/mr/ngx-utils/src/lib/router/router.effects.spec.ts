import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, Subject } from 'rxjs';

import { Back, Forward, Go } from './router.actions';
import { RouterEffects } from './router.effects';

describe('Router Effects', () => {
  let effects: RouterEffects;
  let actions$: Subject<any>;
  let router: Router;
  let loc: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'nowhere', redirectTo: '/' }])],
      providers: [RouterEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(RouterEffects);
    router = TestBed.get(Router);
    loc = TestBed.get(Location);
    actions$ = new ReplaySubject(1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('navigate$', () => {
    it('triggers router navigation', done => {
      const spy = jest.spyOn(router, 'navigate').mockImplementation(() => {});
      actions$.next(new Go({ path: ['nowhere'], query: { id: 42 } }));

      effects.navigate$.subscribe(routing => {
        expect(routing).toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(['nowhere'], { queryParams: { id: 42 } });
        done();
      });
    });
  });

  describe('navigateBack$', () => {
    it('triggers location change', done => {
      const spy = jest.spyOn(loc, 'back').mockImplementation(() => {});
      actions$.next(new Back());

      effects.navigateBack$.subscribe(() => {
        expect(spy).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('navigateForward$', () => {
    it('triggers location change', done => {
      const spy = jest.spyOn(loc, 'forward').mockImplementation(() => {});
      actions$.next(new Forward());

      effects.navigateForward$.subscribe(() => {
        expect(spy).toHaveBeenCalled();
        done();
      });
    });
  });
});
