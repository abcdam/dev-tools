import type { OperAwaitable, OperUnknown, PromUnknown } from "#intern/types";
import { typeOf } from "#utility/guard/index.js";
import type { Oper } from "#utility/types/oper.js";
import { assertOpsArgs, F_PROM_RSLV } from "./internal.js";

type MaybeReturns = PromiseLike<unknown> | null | undefined;
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
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
): Promise<Awaited<C>>;
export function seqAsync<A, B, C, D>(
  initial: A,
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
): Promise<Awaited<D>>;
export function seqAsync<A, B, C, D, E>(
  initial: A,
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
): Promise<E>;
export function seqAsync<A, B, C, D, E, F>(
  initial: A,
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
): Promise<F>;
export function seqAsync<A, B, C, D, E, F, G>(
  initial: A,
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
  op6: OperAwaitable<F, G>,
): Promise<G>;
export function seqAsync<A, B, C, D, E, F, G, H>(
  initial: A,
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
  op6: OperAwaitable<F, G>,
  op7: OperAwaitable<G, H>,
): Promise<H>;
export function seqAsync<A, B, C, D, E, F, G, H, I>(
  initial: A,
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
  op6: OperAwaitable<F, G>,
  op7: OperAwaitable<G, H>,
  op8: OperAwaitable<H, I>,
): Promise<I>;
export function seqAsync<A, B, C, D, E, F, G, H, I, J>(
  initial: A,
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
  op6: OperAwaitable<F, G>,
  op7: OperAwaitable<G, H>,
  op8: OperAwaitable<H, I>,
  op9: OperAwaitable<I, J>,
): Promise<J>;
export function seqAsync<A, B, C, D, E, F, G, H, I, J, K>(
  initial: A,
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
  op6: OperAwaitable<F, G>,
  op7: OperAwaitable<G, H>,
  op8: OperAwaitable<H, I>,
  op9: OperAwaitable<I, J>,
  op10: OperAwaitable<J, K>,
): Promise<K>;
export function seqAsync<A, B, C, D, E, F, G, H, I, J, K, L>(
  initial: A,
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
  op6: OperAwaitable<F, G>,
  op7: OperAwaitable<G, H>,
  op8: OperAwaitable<H, I>,
  op9: OperAwaitable<I, J>,
  op10: OperAwaitable<J, K>,
  op11: OperAwaitable<K, L>,
): Promise<L>;
export function seqAsync<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  initial: A,
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
  op6: OperAwaitable<F, G>,
  op7: OperAwaitable<G, H>,
  op8: OperAwaitable<H, I>,
  op9: OperAwaitable<I, J>,
  op10: OperAwaitable<J, K>,
  op11: OperAwaitable<K, L>,
  op12: OperAwaitable<L, M>,
): Promise<M>;

export function seqAsync(
  r: MaybeReturns,
  op1?: Oper<unknown, MaybeReturns>,
  op2?: Oper<unknown, MaybeReturns>,
  op3?: Oper<unknown, MaybeReturns>,
  op4?: Oper<unknown, MaybeReturns>,
  ...ops: Oper<unknown, MaybeReturns>[]
): PromUnknown {
  const opCount =
    (op1 ? 1 : 0) + (op2 ? 1 : 0) + (op3 ? 1 : 0) + (op4 ? 1 : 0) + ops.length;

  if (!IS_PROD)
    assertOpsArgs("seqAsync", [op1, op2, op3, op4, ...ops], 2, opCount);
  try {
    r = r != null && typeOf(r.then, 3) ? r.then(op1) : op1!(r);
    r = r != null && typeOf(r.then, 3) ? r.then(op2) : op2!(r);
    if (opCount === 2) return Promise.resolve(r);

    r = r != null && typeOf(r.then, 3) ? r.then(op3) : op3!(r);
    if (opCount === 3) return Promise.resolve(r);

    r = r != null && typeOf(r.then, 3) ? r.then(op4) : op4!(r);
    if (opCount === 4) return Promise.resolve(r);
    else return _seqAsyncEager(r, ops);
  } catch (e) {
    return Promise.reject(e);
  }
}
export const _seqAsyncEager = (
  acc: MaybeReturns,
  fns: Oper<unknown, MaybeReturns>[],
): PromUnknown => {
  const totalLimit = fns.length;
  for (let i = 0; i < totalLimit; i++) {
    if (acc != null && typeOf(acc.then, 3))
      return _asyncTail(acc as any, fns, i);
    else acc = fns[i]!(acc);
  }
  return F_PROM_RSLV(acc);
};
export const _asyncTail = (
  pl: PromiseLike<unknown>,
  fns: OperUnknown[],
  startIndex: number = 0,
): Promise<unknown> => {
  const opCount = fns.length;
  let p = F_PROM_RSLV(pl);
  for (let i = startIndex; i < opCount; i++) p = p.then(fns[i]);
  return p;
};
