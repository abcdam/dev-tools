/** biome-ignore-all lint/suspicious/noExplicitAny: <impl simple enough to omit casting> */
import type { Oper } from "#utility/types/oper.js";
import { assertOpsArgs } from "./internal.js";

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

export function seq<A, B>(initial: A, op1: Oper<A, B>): B;
export function seq<A, B, C>(initial: A, op1: Oper<A, B>, op2: Oper<B, C>): C;
export function seq<A, B, C, D>(
  initial: A,
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
): D;
export function seq<A, B, C, D, E>(
  initial: A,
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
  op4: Oper<D, E>,
): E;
export function seq<A, B, C, D, E, F>(
  initial: A,
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
  op4: Oper<D, E>,
  op5: Oper<E, F>,
): F;
export function seq<A, B, C, D, E, F, G>(
  initial: A,
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
  op4: Oper<D, E>,
  op5: Oper<E, F>,
  op6: Oper<F, G>,
): G;
export function seq<A, B, C, D, E, F, G, H>(
  initial: A,
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
  op4: Oper<D, E>,
  op5: Oper<E, F>,
  op6: Oper<F, G>,
  op7: Oper<G, H>,
): H;
export function seq<A, B, C, D, E, F, G, H, I, J>(
  initial: A,
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
  op4: Oper<D, E>,
  op5: Oper<E, F>,
  op6: Oper<F, G>,
  op7: Oper<G, H>,
  op8: Oper<H, I>,
  op9: Oper<I, J>,
): J;
export function seq<A, B, C, D, E, F, G, H, I, J, K>(
  initial: A,
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
  op4: Oper<D, E>,
  op5: Oper<E, F>,
  op6: Oper<F, G>,
  op7: Oper<G, H>,
  op8: Oper<H, I>,
  op9: Oper<I, J>,
  op10: Oper<J, K>,
): K;

export function seq(
  v: unknown,
  op1: any,
  op2?: any,
  op3?: any,
  op4?: any,
  op5?: any,
  op6?: any,
  op7?: any,
  op8?: any,
  op9?: any,
  op10?: any,
): unknown {
  const opCount =
    (op1 ? 1 : 0)
    + (op2 ? 1 : 0)
    + (op3 ? 1 : 0)
    + (op4 ? 1 : 0)
    + (op5 ? 1 : 0)
    + (op6 ? 1 : 0)
    + (op7 ? 1 : 0)
    + (op8 ? 1 : 0);
  +(op9 ? 1 : 0) + (op10 ? 1 : 0);
  if (!IS_PROD)
    assertOpsArgs(
      "seq",
      [op1, op2, op3, op4, op5, op6, op7, op8, op9, op10],
      1,
      opCount,
    );
  if (opCount === 1) return op1(v);
  if (opCount === 2) return op2(op1(v));
  if (opCount === 3) return op3(op2(op1(v)));
  if (opCount === 4) return op4(op3(op2(op1(v))));
  if (opCount === 5) return op5(op4(op3(op2(op1(v)))));
  if (opCount === 6) return op6(op5(op4(op3(op2(op1(v))))));
  if (opCount === 7) return op7(op6(op5(op4(op3(op2(op1(v)))))));
  if (opCount === 8) return op8(op7(op6(op5(op4(op3(op2(op1(v))))))));
  if (opCount === 9) return op9(op8(op6(op5(op4(op3(op2(op1(v))))))));
  return op10(op9(op8(op7(op6(op5(op4(op3(op2(op1(v))))))))));
}
