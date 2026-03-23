import { err, ok, type Result } from "../../primitive.js";

export function checkOr<V, U extends V, E>(
  guard: (input: V) => input is U,
  error: E,
): (input: V) => Result<U, E>;

export function checkOr<V, E>(
  predicate: (input: V) => boolean,
  error: E,
): (input: V) => Result<V, E>;

export function checkOr<V, E>(predicate: (input: V) => boolean, errValue: E) {
  return (input: V) => (predicate(input) ? ok(input) : err(errValue));
}

export function checkElse<V, U extends V, E>(
  guard: (input: V) => input is U,
  errFn: (input: V) => E,
): (input: V) => Result<U, E>;

export function checkElse<V, E>(
  predicate: (input: V) => boolean,
  errFn: (input: V) => E,
): (input: V) => Result<V, E>;

export function checkElse<V, E>(
  predicate: (input: V) => boolean,
  errFn: (input: V) => E,
) {
  return (input: V) => (predicate(input) ? ok(input) : err(errFn(input)));
}
