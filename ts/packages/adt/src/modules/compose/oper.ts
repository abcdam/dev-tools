import type { OperUnknown } from "#intern/types";
import type { Oper } from "#utility/types/oper.js";
import { assertOpsArgs } from "./internal.js";

export function oper<A, B>(op1: Oper<A, B>): Oper<A, B>;
export function oper<A, B, C>(op1: Oper<A, B>, op2: Oper<B, C>): Oper<A, C>;

export function oper<A, B, C, D>(
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
): Oper<A, D>;

export function oper<A, B, C, D, E>(
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
  op4: Oper<D, E>,
): Oper<A, E>;

export function oper<A, B, C, D, E, F>(
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
  op4: Oper<D, E>,
  op5: Oper<E, F>,
): Oper<A, F>;

export function oper<A, B, C, D, E, F, G>(
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
  op4: Oper<D, E>,
  op5: Oper<E, F>,
  op6: Oper<F, G>,
): Oper<A, G>;

export function oper<A, B, C, D, E, F, G, H>(
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
  op4: Oper<D, E>,
  op5: Oper<E, F>,
  op6: Oper<F, G>,
  op7: Oper<G, H>,
): Oper<A, H>;

export function oper<A, B, C, D, E, F, G, H, I>(
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
  op4: Oper<D, E>,
  op5: Oper<E, F>,
  op6: Oper<F, G>,
  op7: Oper<G, H>,
  op8: Oper<H, I>,
): Oper<A, I>;

export function oper<A, B, C, D, E, F, G, H, I, J>(
  op1: Oper<A, B>,
  op2: Oper<B, C>,
  op3: Oper<C, D>,
  op4: Oper<D, E>,
  op5: Oper<E, F>,
  op6: Oper<F, G>,
  op7: Oper<G, H>,
  op8: Oper<H, I>,
  op9: Oper<I, J>,
): Oper<A, J>;

export function oper<A, B, C, D, E, F, G, H, I, J, K>(
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
): Oper<A, K>;

export function oper<A, B, C, D, E, F, G, H, I, J, K, L>(
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
  op11: Oper<K, L>,
): Oper<A, L>;

export function oper<A, B, C, D, E, F, G, H, I, J, K, L, M>(
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
  op11: Oper<K, L>,
  op12: Oper<L, M>,
): Oper<A, M>;

export function oper(...ops: OperUnknown[]): OperUnknown {
  const opCount = ops.length;
  if (!IS_PROD) assertOpsArgs("oper", ops, 1, opCount);

  const op1 = ops[0] as OperUnknown;

  if (opCount === 1) {
    const arity1: OperUnknown = v => op1(v);
    return arity1;
  }
  const op2 = ops[1] as OperUnknown;
  if (opCount === 2) {
    const arity2: OperUnknown = v => op2(op1(v));
    return arity2;
  }

  const op3 = ops[2] as OperUnknown;
  if (opCount === 3) {
    const arity3: OperUnknown = v => op3(op2(op1(v)));
    return arity3;
  }

  const op4 = ops[3] as OperUnknown;
  if (opCount === 4) {
    const arity4: OperUnknown = v => op4(op3(op2(op1(v))));
    return arity4;
  }

  const op5 = ops[4] as OperUnknown;
  if (opCount === 5) {
    const arity5: OperUnknown = v => op5(op4(op3(op2(op1(v)))));
    return arity5;
  }

  const op6 = ops[5] as OperUnknown;

  if (opCount === 6) {
    const arity6: OperUnknown = v => op6(op5(op4(op3(op2(op1(v))))));
    return arity6;
  }
  const op7 = ops[6] as OperUnknown;
  const arity7Plus: OperUnknown = v => {
    const first7 = op7(op6(op5(op4(op3(op2(op1(v)))))));
    let acc = first7;
    for (let i = 7; i < opCount; i++) acc = (ops[i] as OperUnknown)(acc);
    return acc;
  };

  return arity7Plus;
}
