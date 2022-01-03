import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from './action';
import { Store } from './store.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser$: Observable<{ name: string }>;

  constructor(public store: Store) {
    this.currentUser$ = this.store.select('currentUser') as Observable<{
      name: string;
    }>;
  }

  set() {
    this.store.dispatch(new Action('SET', { hello: 'world' }));
  }

  update() {
    this.store.dispatch(
      new Action('UPDATE', { currentUser: { name: 'David' } })
    );
  }

  delete() {
    this.store.dispatch(new Action('DELETE', 'currentUser'));
  }
}
