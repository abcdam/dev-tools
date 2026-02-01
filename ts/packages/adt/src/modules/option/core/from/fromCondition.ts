import { isDefined } from "@internal/guards";
import { none, some } from "@option:core/primitives";
import type { Option } from "@option:core/types";
export const defined = <T>(value: T): Option<NonNullable<T>> =>
  isDefined(value) ? some(value) : none();

export function check<V, U extends V>(
  input: V,
  guard: (input: V) => input is U,
): Option<U>;

export function check<V>(input: V, predicate: (input: V) => boolean): Option<V>;

export function check<V>(
  input: V,
  predicate: (input: V) => boolean,
): Option<V> {
  return predicate(input) ? some(input) : none();
}
