import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// export class FetchUsersStart implements ApiStartAction {
//   readonly type = '[Users] Fetch Start';
//   constructor(public payload: any) {}
// }

// export class FetchUsersSuccess<T> implements ApiSuccessAction<T> {
//   readonly type = '[Users] Fetch Success';
//   constructor(public payload: T) {}
// }

// export class FetchUsersError implements ApiErrorAction {
//   readonly type = '[Users] Fetch Error';
//   constructor(public payload: HttpErrorResponse) {}
// }

// export class FetchUsersComplete implements Action {
//   readonly type = '[Users] Fetch Complete';
// }

@Component({
  selector: 'mr-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  constructor(public store: Store<any>) {}

  public ngOnInit() {
    // this.store.dispatch(
    //   new ApiRequest({
    //     request: new HttpRequest('GET', 'users'),
    //     actions: {
    //       start: FetchUsersStart,
    //       success: FetchUsersSuccess,
    //       error: FetchUsersError,
    //       complete: FetchUsersComplete,
    //     },
    //   })
    // );
    // this.store.dispatch(
    //   new ApiGetAction('users', {
    //     start: FetchUsersStart,
    //     success: FetchUsersSuccess,
    //     error: FetchUsersError,
    //     complete: FetchUsersComplete,
    //   })
    // );
    // setTimeout(() => {
    //   this.store.dispatch(new AppReset());
    // }, 5000);
  }
}
