import { assertOpsArgs, type UnknownFn } from "./internal.js";
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

export function seq(
  v: unknown,
  f1: any,
  f2?: any,
  f3?: any,
  f4?: any,
  f5?: any,
  f6?: any,
  f7?: any,
  f8?: any,
): unknown {
  const opCount =
    (f1 ? 1 : 0)
    + (f2 ? 1 : 0)
    + (f3 ? 1 : 0)
    + (f4 ? 1 : 0)
    + (f5 ? 1 : 0)
    + (f6 ? 1 : 0)
    + (f7 ? 1 : 0)
    + (f8 ? 1 : 0);
  if (!IS_PROD)
    assertOpsArgs("seq", [f1, f2, f3, f4, f5, f6, f7, f8], 1, opCount);
  if (opCount === 1) return f1(v);
  if (opCount === 2) return f2(f1(v));
  if (opCount === 3) return f3(f2(f1(v)));
  if (opCount === 4) return f4(f3(f2(f1(v))));
  if (opCount === 5) return f5(f4(f3(f2(f1(v)))));
  if (opCount === 6) return f6(f5(f4(f3(f2(f1(v))))));
  if (opCount === 7) return f7(f6(f5(f4(f3(f2(f1(v)))))));
  return f8(f7(f6(f5(f4(f3(f2(f1(v))))))));
}
