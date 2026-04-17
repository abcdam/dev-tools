import { _NONE } from "#option/const.js";
import { type Option, some } from "../../primitive.js";

export function find<T, U extends T>(
  predicate: (item: T) => item is U,
): (list: T[]) => Option<U>;

export function find<T>(
  predicate: (item: T) => boolean,
): (list: T[]) => Option<T>;

export function find<T>(predicate: (item: T) => boolean) {
  return (list: T[]) => {
    const limit = list.length;
    for (let i = 0; i < limit; i++) {
      const item = list[i] as T; // we expect real (dense) arrays
      if (predicate(item)) return some(item);
    }
    return _NONE;
  };
}

type MapFn<T, U> = (item: T, index: number) => U;
const _trafoList = <T, U>(collection: T[], mapFn: MapFn<T, U>): U[] => {
  const limit = collection.length;
  const mapped = [];
  for (let i = 0; i < limit; i++) mapped.push(mapFn(collection[i] as T, i));
  return mapped;
};

export function collect<T, U>(
  mapFn: MapFn<T, U>,
): (collection: Iterable<T> | T[]) => Option<[U, ...U[]]> {
  return (collection: Iterable<T> | T[]): Option<[U, ...U[]]> => {
    const opts = Array.isArray(collection)
      ? _trafoList(collection, mapFn)
      : Array.from<T, U>(collection, mapFn);
    return opts.length === 0 ? _NONE : (some(opts) as Option<[U, ...U[]]>);
  };
}
