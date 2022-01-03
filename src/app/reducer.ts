import { omit } from 'lodash';
import { scan } from 'rxjs';
import { Action } from './action';

const WINDOW: any = window as any;

/**
 * reducer is a custom rxJs operator
 */
export const reducer = () =>
  scan<any>((state: any, action: Action) => {
    let next;

    switch (action.type) {
      case 'SET':
        next = action.payload;
        break;
      case 'UPDATE':
        next = { ...state, ...action.payload };
        break;
      case 'DELETE':
        //omit: this method creates an object composed of properties that are not omitted.
        next = omit(state, action.payload);
        break;
      default:
        next = state;
        break;
    }

    console.log('new action', action.type);
    WINDOW.devTools?.send(action.type, next);

    return next;
  });
