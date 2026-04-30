import type { OperGuard, OperPredicate } from "#compose/index.js";
import { _NONE } from "#option/construct.internal.js";
import { type OperOption_O, type Option, some } from "../../primitive.js";

export function find<T, U extends T>(
  guard: OperGuard<T, U>,
): OperOption_O<T[], U>;

export function find<T>(predicate: OperPredicate<T>): OperOption_O<T[], T>;

export function find<T>(predicate: OperPredicate<T>) {
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

export const collect =
  <T, U>(
    mapFn: (item: T, index: number) => U,
  ): OperOption_O<Iterable<T> | T[], [U, ...U[]]> =>
  collection => {
    const opts = Array.isArray(collection)
      ? _trafoList(collection, mapFn)
      : Array.from<T, U>(collection, mapFn);
    return opts.length === 0 ? _NONE : (some(opts) as Option<[U, ...U[]]>);
  };
