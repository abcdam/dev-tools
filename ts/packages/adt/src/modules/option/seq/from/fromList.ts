import { findItem as findItemCore } from "@option:core/from/fromList";
import type { Option } from "@option:core/types";

export function findItem<T, U extends T>(
  predicate: (item: T) => item is U,
): (list: T[]) => Option<U>;

export function findItem<T>(
  predicate: (item: T) => boolean,
): (list: T[]) => Option<T>;

export function findItem<T>(predicate: (item: T) => boolean) {
  return (list: T[]) => findItemCore(list, predicate);
}
