import type { Oper } from "./types.js";

/**
 * Executes a pipeline of synchronous, unary functions. For async contexts, use {@link seqAsync}.
 * * This pipeline reduces a sequence of functions onto an initial value.
 * Each function in `fns` receives the result of the previous one.
 *
 * @param initialValue
 * @param fns - A rest parameter of up to 16 unary functions/operations to apply sequentially.
 * @returns The final result after all functions have been applied.
 *
 *  @remarks This function
 * * does not handle side effects
 * * operates on a shallow copy of `initialValue`.
 * @see {@link SeqFn} for the type definition
 */
export function seq<A>(initial: A): A;
export function seq<A, B>(initial: A, f1: Oper<A, B>): B;
export function seq<A, B, C>(initial: A, f1: Oper<A, B>, f2: Oper<B, C>): C;
export function seq<A, B, C, D>(
  initial: A,
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
): D;
export function seq<A, B, C, D, E>(
  initial: A,
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
): E;
export function seq<A, B, C, D, E, F>(
  initial: A,
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
): F;
export function seq<A, B, C, D, E, F, G>(
  initial: A,
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
  f6: Oper<F, G>,
): G;
export function seq<A, B, C, D, E, F, G, H>(
  initial: A,
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
  f6: Oper<F, G>,
  f7: Oper<G, H>,
): H;
export function seq<A, B, C, D, E, F, G, H, I>(
  initial: A,
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
  f6: Oper<F, G>,
  f7: Oper<G, H>,
  f8: Oper<H, I>,
): I;
export function seq<A, B, C, D, E, F, G, H, I, J>(
  initial: A,
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
  f6: Oper<F, G>,
  f7: Oper<G, H>,
  f8: Oper<H, I>,
  f9: Oper<I, J>,
): J;
export function seq<A, B, C, D, E, F, G, H, I, J, K>(
  initial: A,
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
  f6: Oper<F, G>,
  f7: Oper<G, H>,
  f8: Oper<H, I>,
  f9: Oper<I, J>,
  f10: Oper<J, K>,
): K;
export function seq<A, B, C, D, E, F, G, H, I, J, K, L>(
  initial: A,
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
  f6: Oper<F, G>,
  f7: Oper<G, H>,
  f8: Oper<H, I>,
  f9: Oper<I, J>,
  f10: Oper<J, K>,
  f11: Oper<K, L>,
): L;
export function seq<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  initial: A,
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
  f6: Oper<F, G>,
  f7: Oper<G, H>,
  f8: Oper<H, I>,
  f9: Oper<I, J>,
  f10: Oper<J, K>,
  f11: Oper<K, L>,
  f12: Oper<L, M>,
): M;

export function seq(initialValue: any, ...fns: any[]): any {
  let acc = initialValue;
  for (let i = 0; i < fns.length; i++) acc = fns[i](acc);
  return acc;
}
