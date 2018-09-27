import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';

import { reducer } from '../../auth/reducers/auth.reducer';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot<any, any>({ auth: reducer })],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Actions', () => {
    let store: Store<any>;
    let dispatchSpy: jest.Mock;

    beforeEach(() => {
      store = TestBed.get(Store);
      dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation(() => {});
    });

    describe('login', () => {
      it('dispatches Authenticate action with valid form data', () => {
        component.form.setValue({ email: 'test@example.com', password: 'secret' });
        component.login();

        expect(dispatchSpy).toHaveBeenCalledWith({
          payload: { email: 'test@example.com', password: 'secret' },
          type: '[Auth] Authenticate',
        });
      });

      it('does not dispatch any action with invalid form data', () => {
        component.form.setValue({ email: 'no-email', password: 'secret' });
        component.login();

        expect(dispatchSpy).not.toHaveBeenCalled();
      });
    });

    describe('logout', () => {
      it('dispatches Logout action', () => {
        component.logout();

        expect(dispatchSpy).toHaveBeenCalledWith({
          type: '[Auth] Logout',
        });
      });
    });
  });
});
