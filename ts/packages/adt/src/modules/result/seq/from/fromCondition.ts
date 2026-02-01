import {
  check as checkCore,
  checkOrElse as checOrElseCore,
  defined as definedCore,
  definedOrElse as definedOrElseCore,
} from "@result:core/from/fromCondition";
import type { Result } from "../types.js";

export const defined =
  <E>(errValue: E) =>
  <T>(input: T): Result<NonNullable<T>, E> =>
    definedCore(input, errValue);

export const definedOrElse =
  <E>(errorFn: () => E) =>
  <T>(input: T): Result<NonNullable<T>, E> =>
    definedOrElseCore(input, errorFn);

export function check<V, U extends V, E>(
  guard: (input: V) => input is U,
  error: E,
): (input: V) => Result<U, E>;

export function check<V, E>(
  predicate: (input: V) => boolean,
  error: E,
): (input: V) => Result<V, E>;

export function check<V, E>(predicate: (input: V) => boolean, errValue: E) {
  return (input: V) => checkCore(input, predicate, errValue);
}

export function checkOrElse<V, U extends V, E>(
  guard: (input: V) => input is U,
  errFn: (input: V) => E,
): (input: V) => Result<U, E>;

export function checkOrElse<V, E>(
  predicate: (input: V) => boolean,
  errFn: (input: V) => E,
): (input: V) => Result<V, E>;

export function checkOrElse<V, E>(
  predicate: (input: V) => boolean,
  errFn: (input: V) => E,
) {
  return (input: V) => checOrElseCore(input, predicate, errFn);
}
