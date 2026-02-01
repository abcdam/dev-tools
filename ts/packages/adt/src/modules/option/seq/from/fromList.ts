import { fromList as fromListCore } from "@option:core/from/fromList";
import type { Option } from "@option:core/types";

export function fromList<T, U extends T>(
  predicate: (item: T) => item is U,
): (list: T[]) => Option<U>;

export function fromList<T>(
  predicate: (item: T) => boolean,
): (list: T[]) => Option<T>;

export function fromList<T>(predicate: (item: T) => boolean) {
  return (list: T[]) => fromListCore(list, predicate);
}
