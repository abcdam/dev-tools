/** biome-ignore-all lint/suspicious/noDoubleEquals: <intended> */
import { NULL, STR_FUNCTION } from "#utility/guard/guard.js";
import {
  _toPromise,
  assertOpsArgs,
  type OperAwaitable,
  type UnknownFn,
  type UnknP,
} from "./internal.js";
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
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
): Promise<Awaited<C>>;
export function seqAsync<A, B, C, D>(
  initial: A,
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
): Promise<Awaited<D>>;
export function seqAsync<A, B, C, D, E>(
  initial: A,
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
): Promise<E>;
export function seqAsync<A, B, C, D, E, F>(
  initial: A,
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
): Promise<F>;
export function seqAsync<A, B, C, D, E, F, G>(
  initial: A,
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
  f6: OperAwaitable<F, G>,
): Promise<G>;
export function seqAsync<A, B, C, D, E, F, G, H>(
  initial: A,
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
  f6: OperAwaitable<F, G>,
  f7: OperAwaitable<G, H>,
): Promise<H>;
export function seqAsync<A, B, C, D, E, F, G, H, I>(
  initial: A,
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
  f6: OperAwaitable<F, G>,
  f7: OperAwaitable<G, H>,
  f8: OperAwaitable<H, I>,
): Promise<I>;
export function seqAsync<A, B, C, D, E, F, G, H, I, J>(
  initial: A,
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
  f6: OperAwaitable<F, G>,
  f7: OperAwaitable<G, H>,
  f8: OperAwaitable<H, I>,
  f9: OperAwaitable<I, J>,
): Promise<J>;
export function seqAsync<A, B, C, D, E, F, G, H, I, J, K>(
  initial: A,
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
  f6: OperAwaitable<F, G>,
  f7: OperAwaitable<G, H>,
  f8: OperAwaitable<H, I>,
  f9: OperAwaitable<I, J>,
  f10: OperAwaitable<J, K>,
): Promise<K>;
export function seqAsync<A, B, C, D, E, F, G, H, I, J, K, L>(
  initial: A,
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
  f6: OperAwaitable<F, G>,
  f7: OperAwaitable<G, H>,
  f8: OperAwaitable<H, I>,
  f9: OperAwaitable<I, J>,
  f10: OperAwaitable<J, K>,
  f11: OperAwaitable<K, L>,
): Promise<L>;
export function seqAsync<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  initial: A,
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
  f6: OperAwaitable<F, G>,
  f7: OperAwaitable<G, H>,
  f8: OperAwaitable<H, I>,
  f9: OperAwaitable<I, J>,
  f10: OperAwaitable<J, K>,
  f11: OperAwaitable<K, L>,
  f12: OperAwaitable<L, M>,
): Promise<M>;

export function seqAsync(
  r: unknown,
  f1: any,
  f2: any,
  f3?: any,
  f4?: any,
  ...ops: any[]
): UnknP {
  const opCount =
    (f1 ? 1 : 0) + (f2 ? 1 : 0) + (f3 ? 1 : 0) + (f4 ? 1 : 0) + ops.length;

  if (!IS_PROD) assertOpsArgs("seqAsync", [f1, f2, f3, f4, ...ops], 2, opCount);
  try {
    r =
      r != NULL && typeof (r as any).then === STR_FUNCTION
        ? (r as any).then(f1)
        : f1(r);

    r =
      r != NULL && typeof (r as any).then === STR_FUNCTION
        ? (r as any).then(f2)
        : f2(r);

    if (opCount === 2) return Promise.resolve(r);

    r =
      r != NULL && typeof (r as any).then === STR_FUNCTION
        ? (r as any).then(f3)
        : f3!(r);

    if (opCount === 3) return Promise.resolve(r);

    r =
      r != NULL && typeof (r as any).then === STR_FUNCTION
        ? (r as any).then(f4)
        : f4!(r);

    if (opCount === 4) return Promise.resolve(r);
    else return _seqAsyncEager(r, ops);
  } catch (e) {
    return Promise.reject(e);
  }
}
export const _seqAsyncEager = (acc: unknown, fns: any[]): UnknP => {
  const totalLimit = fns.length;
  for (let i = 0; i < totalLimit; i++) {
    if (acc != NULL && typeof (acc as any).then === STR_FUNCTION)
      return _asyncTail(acc as any, fns, i);
    else acc = fns[i](acc);
  }
  return _toPromise(acc);
};
export const _asyncTail = (
  pl: PromiseLike<unknown>,
  fns: UnknownFn[],
  startIndex: number = 0,
): Promise<unknown> => {
  const opCount = fns.length;
  let p = Promise.resolve(pl);
  for (let i = startIndex; i < opCount; i++) p = p.then(fns[i]);
  return p;
};
