import {
  check as checkCore,
  defined as definedCore,
} from "@option:core/from/fromCondition";
import type { Option } from "@option:core/types";
export const defined: typeof definedCore = definedCore;

export function check<V, U extends V>(
  guard: (input: V) => input is U,
): (input: V) => Option<U>;

export function check<V>(
  predicate: (input: V) => boolean,
): (input: V) => Option<V>;

export function check<V>(predicate: (input: V) => boolean) {
  return (input: V) => checkCore(input, predicate);
}
