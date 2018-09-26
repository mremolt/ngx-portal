import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Authenticate } from './auth/reducers/auth.actions';
import { RootState } from './reducers';

@Component({
  selector: 'mr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NGX-Portal';

  constructor(private store: Store<RootState>) {}

  public ngOnInit() {
    console.log(`Site load: ${performance.now().toFixed(2)} ms!`);

    this.store.dispatch(new Authenticate('testuser1@example.com', 'secret'));
  }
}
