import { none, some } from "@option:core/primitives";
import type { Option } from "@option:core/types";

export function fromList<T, U extends T>(
  list: T[],
  guard: (item: T) => item is U,
): Option<U>;
export function fromList<T>(
  list: T[],
  predicate: (item: T) => boolean,
): Option<T>;
export function fromList<T>(
  list: T[],
  predicate: (item: T) => boolean,
): Option<T> {
  const limit = list.length;
  for (let i = 0; i < limit; i++) {
    const item = list[i] as T; // we expect real (dense) arrays
    if (predicate(item)) return some(item);
  }
  return none();
}
