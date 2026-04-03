import { _NONE } from "#option/const.js";
import { type Option, some } from "../../primitive.js";

export function findItem<T, U extends T>(
  predicate: (item: T) => item is U,
): (list: T[]) => Option<U>;

export function findItem<T>(
  predicate: (item: T) => boolean,
): (list: T[]) => Option<T>;

export function findItem<T>(predicate: (item: T) => boolean) {
  return (list: T[]) => {
    const limit = list.length;
    for (let i = 0; i < limit; i++) {
      const item = list[i] as T; // we expect real (dense) arrays
      if (predicate(item)) return some(item);
    }
    return _NONE;
  };
}
