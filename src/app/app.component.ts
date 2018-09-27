import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NGX-Portal';

  constructor() {}

  public ngOnInit() {
    console.log(`Site load: ${performance.now().toFixed(2)} ms!`);
  }
}
