import { isPromiseLike } from "#utility/guard.js";
import {
  _chain1,
  _chain2,
  _chain3,
  _chain4,
  _chain5,
  _chain6,
  _toPromise,
  assertOpsArgs,
  type OperAwaitable,
  type PromiseFn,
  type UnknownFn,
  type UnknP,
} from "./internal.js";
import type { Oper, OperAsync } from "./types.js";

export function operAsync<A, B, C>(
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
): OperAsync<A, C>;

export function operAsync<A, B, C, D>(
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
): OperAsync<A, D>;

export function operAsync<A, B, C, D, E>(
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
): OperAsync<A, E>;

export function operAsync<A, B, C, D, E, F>(
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
): OperAsync<A, F>;

export function operAsync<A, B, C, D, E, F, G>(
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
  f6: OperAwaitable<F, G>,
): OperAsync<A, G>;

export function operAsync<A, B, C, D, E, F, G, H>(
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
  f6: OperAwaitable<F, G>,
  f7: OperAwaitable<G, H>,
): OperAsync<A, H>;

export function operAsync<A, B, C, D, E, F, G, H, I>(
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
  f6: OperAwaitable<F, G>,
  f7: OperAwaitable<G, H>,
  f8: OperAwaitable<H, I>,
): OperAsync<A, I>;

export function operAsync<A, B, C, D, E, F, G, H, I, J>(
  f1: OperAwaitable<A, B>,
  f2: OperAwaitable<B, C>,
  f3: OperAwaitable<C, D>,
  f4: OperAwaitable<D, E>,
  f5: OperAwaitable<E, F>,
  f6: OperAwaitable<F, G>,
  f7: OperAwaitable<G, H>,
  f8: OperAwaitable<H, I>,
  f9: OperAwaitable<I, J>,
): OperAsync<A, J>;

export function operAsync<A, B, C, D, E, F, G, H, I, J, K>(
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
): OperAsync<A, K>;

export function operAsync<A, B, C, D, E, F, G, H, I, J, K, L>(
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
): OperAsync<A, L>;

export function operAsync<A, B, C, D, E, F, G, H, I, J, K, L, M>(
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
): OperAsync<A, M>;

export function operAsync(
  ...ops: UnknownFn[]
): Oper<unknown, Promise<unknown>> {
  const opCount = ops.length;
  if (!IS_PROD) assertOpsArgs("operAsync", ops, 2, opCount);

  const f1 = ops[0] as UnknownFn;
  const f2 = ops[1] as UnknownFn;
  if (opCount === 2) {
    const op2: PromiseFn = r0 => {
      if (isPromiseLike(r0)) return _chain2(r0, f1, f2);
      try {
        const r1 = f1(r0);
        return isPromiseLike(r1) ? _chain1(r1, f2) : _toPromise(f2(r1));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return op2;
  }
  const f3 = ops[2] as UnknownFn;
  if (opCount === 3) {
    const op3: PromiseFn = r => {
      if (isPromiseLike(r)) return _chain3(r, f1, f2, f3);
      try {
        r = f1(r);
        if (isPromiseLike(r)) return _chain2(r, f2, f3);

        r = f2(r);
        return isPromiseLike(r) ? _chain1(r, f3) : _toPromise(f3(r));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return op3;
  }
  const f4 = ops[3] as UnknownFn;
  if (opCount === 4) {
    const op4: PromiseFn = r => {
      if (isPromiseLike(r)) return _chain4(r, f1, f2, f3, f4);
      try {
        r = f1(r);
        if (isPromiseLike(r)) return _chain3(r, f2, f3, f4);
        r = f2(r);
        if (isPromiseLike(r)) return _chain2(r, f3, f4);

        r = f3(r);
        return isPromiseLike(r) ? _chain1(r, f4) : _toPromise(f4(r));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return op4;
  }
  const f5 = ops[4] as UnknownFn;
  if (opCount === 5) {
    const op5: PromiseFn = r => {
      if (isPromiseLike(r)) return _chain5(r, f1, f2, f3, f4, f5);

      try {
        r = f1(r);
        if (isPromiseLike(r)) return _chain4(r, f2, f3, f4, f5);
        r = f2(r);
        if (isPromiseLike(r)) return _chain3(r, f3, f4, f5);
        r = f3(r);
        if (isPromiseLike(r)) return _chain2(r, f4, f5);

        r = f4(r);
        return isPromiseLike(r) ? _chain1(r, f5) : _toPromise(f5(r));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return op5;
  }
  const f6 = ops[5] as UnknownFn;

  const [handleTail, handleop7Plus] = makeOp6PlusHandlers(ops, 6);
  const op6Plus: PromiseFn = r => {
    if (isPromiseLike(r)) return handleTail(_chain6(r, f1, f2, f3, f4, f5, f6));
    try {
      r = f1(r);
      if (isPromiseLike(r)) return handleTail(_chain5(r, f2, f3, f4, f5, f6));
      r = f2(r);
      if (isPromiseLike(r)) return handleTail(_chain4(r, f3, f4, f5, f6));
      r = f3(r);
      if (isPromiseLike(r)) return handleTail(_chain3(r, f4, f5, f6));
      r = f4(r);
      if (isPromiseLike(r)) return handleTail(_chain2(r, f5, f6));

      r = f5(r);
      if (isPromiseLike(r)) return handleTail(_chain1(r, f6));
      return handleop7Plus(f6(r));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return op6Plus;
}

type TailhandlerCb = (p: UnknP, startAt?: number) => UnknP;
type ArityNHandler = (rAcc: PromiseLike<unknown> | unknown) => UnknP;

const makeOp6PlusHandlers = (
  restOps: UnknownFn[],
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
            if (isPromiseLike(rAcc)) return tailHandler(_toPromise(rAcc), i);
            else rAcc = restOps[i]!(rAcc);
          return _toPromise(rAcc);
        }
      : r6 => _toPromise(r6),
  ];
};
