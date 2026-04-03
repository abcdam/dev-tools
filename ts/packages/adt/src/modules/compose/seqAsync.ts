import { isPromiseLike } from "#utility/guard.js";
import { _asyncTail, _seqAsyncEager, type UnknownFn } from "./internal.js";
import type { OperAsync } from "./types.js";

/**
 *
 *
 *
 * @param initial - intial value
 * @param fns unary operations (single input functions) to apply in sequence.
 * @returns a promise that resolves to the final output value
 *
 * @see {@link OperAsync}
 */
export function seqAsync<A, B, C>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
): Promise<C>;
export function seqAsync<A, B, C, D>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
): Promise<D>;
export function seqAsync<A, B, C, D, E>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
): Promise<E>;
export function seqAsync<A, B, C, D, E, F>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
): Promise<F>;
export function seqAsync<A, B, C, D, E, F, G>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
): Promise<G>;
export function seqAsync<A, B, C, D, E, F, G, H>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
): Promise<H>;
export function seqAsync<A, B, C, D, E, F, G, H, I>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
  f8: OperAsync<H, I>,
): Promise<I>;
export function seqAsync<A, B, C, D, E, F, G, H, I, J>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
  f8: OperAsync<H, I>,
  f9: OperAsync<I, J>,
): Promise<J>;
export function seqAsync<A, B, C, D, E, F, G, H, I, J, K>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
  f8: OperAsync<H, I>,
  f9: OperAsync<I, J>,
  f10: OperAsync<J, K>,
): Promise<K>;
export function seqAsync<A, B, C, D, E, F, G, H, I, J, K, L>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
  f8: OperAsync<H, I>,
  f9: OperAsync<I, J>,
  f10: OperAsync<J, K>,
  f11: OperAsync<K, L>,
): Promise<L>;
export function seqAsync<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
  f8: OperAsync<H, I>,
  f9: OperAsync<I, J>,
  f10: OperAsync<J, K>,
  f11: OperAsync<K, L>,
  f12: OperAsync<L, M>,
): Promise<M>;

export function seqAsync(initialValue: unknown, ...fns: UnknownFn[]): unknown {
  try {
    return _seqAsyncEager(initialValue, fns);
  } catch (e) {
    return Promise.reject(e);
  }
}
