import { _NONE } from "#option/const.js";
import { type Option, some } from "../../primitive.js";
export function findItem<T, U extends T>(
  list: T[],
  guard: (item: T) => item is U,
): Option<U>;

export function findItem<T>(
  list: T[],
  predicate: (item: T) => boolean,
): Option<T>;

export function findItem<T>(
  list: T[],
  predicate: (item: T) => boolean,
): Option<T> {
  const limit = list.length;
  for (let i = 0; i < limit; i++) {
    const item = list[i] as T; // we expect real (dense) arrays
    if (predicate(item)) return some(item);
  }
  return _NONE;
}
