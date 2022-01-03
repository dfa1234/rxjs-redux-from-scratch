import { get, isEqual } from 'lodash';
import { distinctUntilChanged, map, pipe } from 'rxjs';

export const select = (path: string) =>
  pipe(
    map((state) => get(state, path, null)),
    //isEqual(value, other) Performs a deep comparison between two values
    distinctUntilChanged(isEqual)
  );
