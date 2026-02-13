import { err, ok } from "@result:core/primitives";
import type { Result } from "@result:core/types";
import { isNotNullish } from "../../../utilities/guards/index.js";

export function check<V, U extends V, E>(
  input: V,
  guard: (input: V) => input is U,
  error: E,
): Result<U, E>;

export function check<V, E>(
  input: V,
  predicate: (input: V) => boolean,
  error: E,
): Result<V, E>;

export function check<V, E>(
  input: V,
  predicate: (input: V) => boolean,
  error: E,
): Result<V, E> {
  return predicate(input) ? ok(input) : err(error);
}

export function checkOrElse<V, U extends V, E>(
  input: V,
  guard: (input: V) => input is U,
  errFn: (input: V) => E,
): Result<U, E>;

export function checkOrElse<V, E>(
  input: V,
  predicate: (input: V) => boolean,
  errFn: (input: V) => E,
): Result<V, E>;

export function checkOrElse<V, E>(
  input: V,
  predicate: (input: V) => boolean,
  errFn: (input: V) => E,
) {
  return predicate(input) ? ok(input) : err(errFn(input));
}

export const defined = <T, E>(
  input: T,
  errValue: E,
): Result<NonNullable<T>, E> => check(input, isNotNullish, errValue);

export const definedOrElse = <T, E>(
  input: T,
  errFn: () => E,
): Result<NonNullable<T>, E> => checkOrElse(input, isNotNullish, errFn);
