import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { shareReplay, startWith } from 'rxjs/operators';
import { Action } from './action';
import { select } from './select';
import { reducer } from './reducer';

const WINDOW: any = window as any;

@Injectable({
  providedIn: 'root',
})
export class Store {
  state: Observable<any>;

  actions: Subject<Action> = new Subject();

  devTools: any;

  constructor() {
    this.state = this.actions.pipe(startWith({}), reducer(), shareReplay(1));

    // Redux Dev Tools
    if (WINDOW.__REDUX_DEVTOOLS_EXTENSION__) {
      WINDOW.devTools = WINDOW.__REDUX_DEVTOOLS_EXTENSION__.connect();
    }
  }

  select(path: string) {
    return this.state.pipe(select(path));
  }

  dispatch(action: Action) {
    this.actions.next(action);
  }
}
