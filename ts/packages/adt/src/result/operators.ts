import { err } from "./primitives";
import type { Err, Ok, Result } from "./types";

/**
 * Transforms the error value of a `Result<T, E>` into a new type `Result<T, F>` via the provided mapper function.
 * * Effectively acts as a map operation over the failure path, while propagating
 * successful states (`Ok<T>`) unwidened.
 *
 * @param input - The `Result<T, E>` container to inspect.
 * @param mapFn - A projection function applied only if the input is of kind `Err<E>`.
 *
 * @example
 * const orders = getUserOrders(id); // returns Result<Orders, UnreachableError>
 * // Sanitize internal failure before informing client
 * const response = mapErr(orders, (err) => {
 *    LOG.critical("database crashed", err);
 *    return new HttpError(500, "Improving internal systems, please check again later!");
 * });
 */
// Error case: Err<E> -> Err<F> (avoid widening to Result<T, F>)
export function mapErr<E, F>(input: Err<E>, mapFn: (e: E) => F): Err<F>;

// Ok case: Ok<T> -> Ok<T> (skip)
// biome-ignore lint/suspicious/noExplicitAny: <the mapper is irrelevant for this case>
export function mapErr<T>(input: Ok<T>, mapFn: (e: any) => any): Ok<T>;

// General case: Result<T, E> -> Result<T, F>
export function mapErr<T, E, F>(
  input: Result<T, E>,
  mapFn: (e: E) => F,
): Result<T, F>;

export function mapErr<T, E, F>(
  input: Result<T, E>,
  mapFn: (e: E) => F,
): Result<T, F> {
  return input.ok ? input : err(mapFn(input.error));
}

/**
 * Transforms the success value of a `Result<T, E>` into a new type `Result<U, E | F>` via the provided mapper function.
 * * Effectively acts as a map operation over the happy path
 *
 * * If the input is `Ok`, the function is applied and its return value is returned.
 * * If the input is `Err`, the error is propagated as is.
 *
 * @param input - The `Result<T, E>` to chain.
 * @param mapFn - A function that takes `T` and returns a new `Result<U, E | F>`.
 *
 */

// Err case: Err<E> -> Err<E> (Skip execution, propagate error)
// biome-ignore lint/suspicious/noExplicitAny: <mapper irrelevant for error case>
export function andThen<E>(input: Err<E>, mapFn: (t: any) => any): Err<E>;

// Ok case: Ok<T> -> Result<U, E>
export function andThen<T, U, F>(
  input: Ok<T>,
  mapFn: (t: T) => Result<U, F>,
): Result<U, F>;

// General case: Result<T, E> -> Result<U, E>
export function andThen<T, E, U, F>(
  input: Result<T, E>,
  mapFn: (t: T) => Result<U, F>,
): Result<U, E | F>;

export function andThen<T, E, U, F>(
  input: Result<T, E>,
  mapFn: (t: T) => Result<U, F>,
): Result<U, E | F> {
  return input.ok ? mapFn(input.value) : input;
}
