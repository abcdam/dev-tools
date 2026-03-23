import type { Result } from "#result/primitive.js";
import { err, ok } from "../../primitive.js";
export function checkOr<V, U extends V, E>(
  input: V,
  guard: (input: V) => input is U,
  error: E,
): Result<U, E>;

export function checkOr<V, E>(
  input: V,
  predicate: (input: V) => boolean,
  error: E,
): Result<V, E>;

export function checkOr<V, E>(
  input: V,
  predicate: (input: V) => boolean,
  error: E,
): Result<V, E> {
  return predicate(input) ? ok(input) : err(error);
}

export function checkElse<V, U extends V, E>(
  input: V,
  guard: (input: V) => input is U,
  errFn: (input: V) => E,
): Result<U, E>;

export function checkElse<V, E>(
  input: V,
  predicate: (input: V) => boolean,
  errFn: (input: V) => E,
): Result<V, E>;

export function checkElse<V, E>(
  input: V,
  predicate: (input: V) => boolean,
  errFn: (input: V) => E,
) {
  return predicate(input) ? ok(input) : err(errFn(input));
}
