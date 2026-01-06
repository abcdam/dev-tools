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
