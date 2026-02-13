import { none, some } from "@option:core/primitives";
import type { Option } from "@option:core/types";
import { isNotNullish } from "../../../utilities/guards/index.js";

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

export const defined = <T>(input: T): Option<NonNullable<T>> =>
  check(input, isNotNullish);
