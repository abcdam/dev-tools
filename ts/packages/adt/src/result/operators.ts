import { err } from "./primitives";
import type { Err, Ok, Result } from "./types";

/**
 * Maps the error value if the result is an Err.
 * If the result is Ok, it is returned unchanged.
 */
// Error case: Err<E> -> Err<F> (avoid widening to Result<T, F>)
export function mapErr<E, F>(result: Err<E>, mapFn: (e: E) => F): Err<F>;

// Ok case: Ok<T> -> Ok<T> (skip)
// biome-ignore lint/suspicious/noExplicitAny: <the mapper is irrelevant for this case>
export function mapErr<T>(result: Ok<T>, mapFn: (e: any) => any): Ok<T>;

// General case: Result<T, E> -> Result<T, F>
export function mapErr<T, E, F>(
  result: Result<T, E>,
  mapFn: (e: E) => F,
): Result<T, F>;

export function mapErr<T, E, F>(
  result: Result<T, E>,
  mapFn: (e: E) => F,
): Result<T, F> {
  return result.ok ? result : err(mapFn(result.error));
}
