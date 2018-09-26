import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { configureTestBedSuite } from '../testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  configureTestBedSuite();

  let fixture: ComponentFixture<AppComponent>;

  beforeAll(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ngx-portal'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('NGX-Portal');
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to NGX-Portal!');
  });

  it('renders the component', () => {
    expect(fixture).toMatchSnapshot();
  });
});
