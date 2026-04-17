import { assertOpsArgs, type UnknownFn } from "./internal.js";
import type { Oper } from "./types.js";

export function oper<A, B>(f1: Oper<A, B>): Oper<A, B>;
export function oper<A, B, C>(f1: Oper<A, B>, f2: Oper<B, C>): Oper<A, C>;

export function oper<A, B, C, D>(
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
): Oper<A, D>;

export function oper<A, B, C, D, E>(
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
): Oper<A, E>;

export function oper<A, B, C, D, E, F>(
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
): Oper<A, F>;

export function oper<A, B, C, D, E, F, G>(
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
  f6: Oper<F, G>,
): Oper<A, G>;

export function oper<A, B, C, D, E, F, G, H>(
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
  f6: Oper<F, G>,
  f7: Oper<G, H>,
): Oper<A, H>;

export function oper<A, B, C, D, E, F, G, H, I>(
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
  f6: Oper<F, G>,
  f7: Oper<G, H>,
  f8: Oper<H, I>,
): Oper<A, I>;

export function oper<A, B, C, D, E, F, G, H, I, J>(
  f1: Oper<A, B>,
  f2: Oper<B, C>,
  f3: Oper<C, D>,
  f4: Oper<D, E>,
  f5: Oper<E, F>,
  f6: Oper<F, G>,
  f7: Oper<G, H>,
  f8: Oper<H, I>,
  f9: Oper<I, J>,
): Oper<A, J>;

export function oper<A, B, C, D, E, F, G, H, I, J, K>(
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
): Oper<A, K>;

export function oper<A, B, C, D, E, F, G, H, I, J, K, L>(
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
): Oper<A, L>;

export function oper<A, B, C, D, E, F, G, H, I, J, K, L, M>(
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
): Oper<A, M>;

export function oper(...ops: UnknownFn[]): UnknownFn {
  const opCount = ops.length;
  if (!IS_PROD) assertOpsArgs("oper", ops, 1, opCount);

  const f1 = ops[0] as UnknownFn;

  if (opCount === 1) {
    const op1: UnknownFn = v => f1(v);
    return op1;
  }
  const f2 = ops[1] as UnknownFn;
  if (opCount === 2) {
    const op2: UnknownFn = v => f2(f1(v));
    return op2;
  }

  const f3 = ops[2] as UnknownFn;
  if (opCount === 3) {
    const op3: UnknownFn = v => f3(f2(f1(v)));
    return op3;
  }

  const f4 = ops[3] as UnknownFn;
  if (opCount === 4) {
    const op4: UnknownFn = v => f4(f3(f2(f1(v))));
    return op4;
  }

  const f5 = ops[4] as UnknownFn;
  if (opCount === 5) {
    const op5: UnknownFn = v => f5(f4(f3(f2(f1(v)))));
    return op5;
  }

  const f6 = ops[5] as UnknownFn;

  if (opCount === 6) {
    const op6: UnknownFn = v => f6(f5(f4(f3(f2(f1(v))))));
    return op6;
  }
  const f7 = ops[6] as UnknownFn;
  const arity7Plus: UnknownFn = v => {
    const first7 = f7(f6(f5(f4(f3(f2(f1(v)))))));
    let acc = first7;
    for (let i = 7; i < opCount; i++) acc = (ops[i] as UnknownFn)(acc);
    return acc;
  };

  return arity7Plus;
}
