import type { OperAwaitable, OperUnknown, PromUnknown } from "#intern/types";
import { isPromiseLike } from "#utility/guard/index.js";
import type { OperA } from "#utility/types/oper.js";
import {
  _chain1,
  _chain2,
  _chain3,
  _chain4,
  _chain5,
  _chain6,
  assertOpsArgs,
  F_PROM_RSLV,
  type PromUnknownFn,
} from "./internal.js";

export function operAsync<A, B, C>(
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
): OperA<Awaited<A>, C>;

export function operAsync<A, B, C, D>(
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
): OperA<Awaited<A>, D>;

export function operAsync<A, B, C, D, E>(
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
): OperA<Awaited<A>, E>;

export function operAsync<A, B, C, D, E, F>(
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
): OperA<Awaited<A>, F>;

export function operAsync<A, B, C, D, E, F, G>(
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
  op6: OperAwaitable<F, G>,
): OperA<Awaited<A>, G>;

export function operAsync<A, B, C, D, E, F, G, H>(
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
  op6: OperAwaitable<F, G>,
  op7: OperAwaitable<G, H>,
): OperA<Awaited<A>, H>;

export function operAsync<A, B, C, D, E, F, G, H, I>(
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
  op6: OperAwaitable<F, G>,
  op7: OperAwaitable<G, H>,
  op8: OperAwaitable<H, I>,
): OperA<Awaited<A>, I>;

export function operAsync<A, B, C, D, E, F, G, H, I, J>(
  op1: OperAwaitable<A, B>,
  op2: OperAwaitable<B, C>,
  op3: OperAwaitable<C, D>,
  op4: OperAwaitable<D, E>,
  op5: OperAwaitable<E, F>,
  op6: OperAwaitable<F, G>,
  op7: OperAwaitable<G, H>,
  op8: OperAwaitable<H, I>,
  op9: OperAwaitable<I, J>,
): OperA<Awaited<A>, J>;

export function operAsync<A, B, C, D, E, F, G, H, I, J, K>(
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
): OperA<Awaited<A>, K>;

export function operAsync<A, B, C, D, E, F, G, H, I, J, K, L>(
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
): OperA<Awaited<A>, L>;

export function operAsync<A, B, C, D, E, F, G, H, I, J, K, L, M>(
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
): OperA<Awaited<A>, M>;

export function operAsync(...ops: OperUnknown[]): OperA<unknown, unknown> {
  const opCount = ops.length;
  if (!IS_PROD) assertOpsArgs("operAsync", ops, 2, opCount);

  const op1 = ops[0] as OperUnknown;
  const op2 = ops[1] as OperUnknown;
  if (opCount === 2) {
    const op2: PromUnknownFn = r0 => {
      if (isPromiseLike(r0)) return _chain2(r0, op1, op2);
      try {
        const r1 = op1(r0);
        return isPromiseLike(r1) ? _chain1(r1, op2) : F_PROM_RSLV(op2(r1));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return op2;
  }
  const op3 = ops[2] as OperUnknown;
  if (opCount === 3) {
    const op3: PromUnknownFn = r => {
      if (isPromiseLike(r)) return _chain3(r, op1, op2, op3);
      try {
        r = op1(r);
        if (isPromiseLike(r)) return _chain2(r, op2, op3);

        r = op2(r);
        return isPromiseLike(r) ? _chain1(r, op3) : F_PROM_RSLV(op3(r));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return op3;
  }
  const op4 = ops[3] as OperUnknown;
  if (opCount === 4) {
    const op4: PromUnknownFn = r => {
      if (isPromiseLike(r)) return _chain4(r, op1, op2, op3, op4);
      try {
        r = op1(r);
        if (isPromiseLike(r)) return _chain3(r, op2, op3, op4);
        r = op2(r);
        if (isPromiseLike(r)) return _chain2(r, op3, op4);

        r = op3(r);
        return isPromiseLike(r) ? _chain1(r, op4) : F_PROM_RSLV(op4(r));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return op4;
  }
  const op5 = ops[4] as OperUnknown;
  if (opCount === 5) {
    const op5: PromUnknownFn = r => {
      if (isPromiseLike(r)) return _chain5(r, op1, op2, op3, op4, op5);

      try {
        r = op1(r);
        if (isPromiseLike(r)) return _chain4(r, op2, op3, op4, op5);
        r = op2(r);
        if (isPromiseLike(r)) return _chain3(r, op3, op4, op5);
        r = op3(r);
        if (isPromiseLike(r)) return _chain2(r, op4, op5);

        r = op4(r);
        return isPromiseLike(r) ? _chain1(r, op5) : F_PROM_RSLV(op5(r));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return op5;
  }
  const op6 = ops[5] as OperUnknown;

  const [handleTail, handleop7Plus] = makeOp6PlusHandlers(ops, 6);
  const op6Plus: PromUnknownFn = r => {
    if (isPromiseLike(r))
      return handleTail(_chain6(r, op1, op2, op3, op4, op5, op6));
    try {
      r = op1(r);
      if (isPromiseLike(r))
        return handleTail(_chain5(r, op2, op3, op4, op5, op6));
      r = op2(r);
      if (isPromiseLike(r)) return handleTail(_chain4(r, op3, op4, op5, op6));
      r = op3(r);
      if (isPromiseLike(r)) return handleTail(_chain3(r, op4, op5, op6));
      r = op4(r);
      if (isPromiseLike(r)) return handleTail(_chain2(r, op5, op6));
      r = op5(r);
      if (isPromiseLike(r)) return handleTail(_chain1(r, op6));
      return handleop7Plus(op6(r));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return op6Plus;
}

type TailhandlerCb = (p: PromUnknown, startAt?: number) => PromUnknown;
type ArityNHandler = (rAcc: PromiseLike<unknown> | unknown) => PromUnknown;

const makeOp6PlusHandlers = (
  restOps: OperUnknown[],
  startingIdx: number,
): [TailhandlerCb, ArityNHandler] => {
  const limit = restOps.length;
  const itemsLeft = limit - startingIdx + 1;
  const tailHandler: TailhandlerCb = itemsLeft
    ? (p, startAt = startingIdx) => {
        for (let i = startAt; i < limit; i++) p = p.then(restOps[i]);
        return p;
      }
    : p => p;
  return [
    tailHandler,
    itemsLeft
      ? rAcc => {
          for (let i = startingIdx; i < limit; i++)
            if (isPromiseLike(rAcc)) return tailHandler(F_PROM_RSLV(rAcc), i);
            else rAcc = restOps[i]!(rAcc);
          return F_PROM_RSLV(rAcc);
        }
      : r6 => F_PROM_RSLV(r6),
  ];
};
