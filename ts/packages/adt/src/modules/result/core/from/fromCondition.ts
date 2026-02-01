import { isDefined } from "@internal/guards";
import { err, ok } from "@result:core/primitives";
import type { Result } from "@result:core/types";

export const defined = <T, E>(value: T, error: E): Result<NonNullable<T>, E> =>
  isDefined(value) ? ok(value) : err(error);

export const definedOrElse = <T, E>(
  value: T,
  errFn: () => E,
): Result<NonNullable<T>, E> => (isDefined(value) ? ok(value) : err(errFn()));

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
