import { isPromiseLike } from "#utility/guard.js";
import { _asyncTail, _operAsyncFallback, type UnknownFn } from "./internal.js";
import type { Oper, OperAsync } from "./types.js";

export function operAsyncFast<A, B, C>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
): OperAsync<A, C>;

export function operAsyncFast<A, B, C, D>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
): OperAsync<A, D>;

export function operAsyncFast<A, B, C, D, E>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
): OperAsync<A, E>;

export function operAsyncFast<A, B, C, D, E, F>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
): OperAsync<A, F>;

export function operAsyncFast<A, B, C, D, E, F, G>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
): OperAsync<A, G>;

export function operAsyncFast<A, B, C, D, E, F, G, H>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
): OperAsync<A, H>;

export function operAsyncFast<A, B, C, D, E, F, G, H, I>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
  f8: OperAsync<H, I>,
): OperAsync<A, I>;

export function operAsyncFast<A, B, C, D, E, F, G, H, I, J>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
  f8: OperAsync<H, I>,
  f9: OperAsync<I, J>,
): OperAsync<A, J>;

export function operAsyncFast<A, B, C, D, E, F, G, H, I, J, K>(
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
): OperAsync<A, K>;

export function operAsyncFast<A, B, C, D, E, F, G, H, I, J, K, L>(
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
): OperAsync<A, L>;

export function operAsyncFast<A, B, C, D, E, F, G, H, I, J, K, L, M>(
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
): OperAsync<A, M>;

export function operAsyncFast(
  f1: any,
  f2: any,
  f3?: any,
  f4?: any,
  f5?: any,
  ...restFns: UnknownFn[]
): Oper<unknown, unknown> {
  const limit = arguments.length;
  if (limit === 2)
    return acc => {
      if (isPromiseLike(acc)) return Promise.resolve(acc).then(f1).then(f2);
      const r = f1(acc);
      return isPromiseLike(r) ? r.then(f2) : Promise.resolve(f2(r));
    };
  else if (limit === 3)
    return acc => {
      if (isPromiseLike(acc))
        return Promise.resolve(acc).then(f1).then(f2).then(f3);
      const r1 = f1(acc);
      if (isPromiseLike(r1)) return r1.then(f2).then(f3);
      const r2 = f2(r1);
      return isPromiseLike(r2) ? r2.then(f3) : Promise.resolve(f3(r2));
    };
  else if (limit === 4)
    return acc => {
      if (isPromiseLike(acc))
        return Promise.resolve(acc).then(f1).then(f2).then(f3).then(f4);
      const r1 = f1(acc);
      if (isPromiseLike(r1)) return r1.then(f2).then(f3).then(f4);
      const r2 = f2(r1);
      if (isPromiseLike(r2)) return r2.then(f3).then(f4);
      const r3 = f3(r2);
      return isPromiseLike(r3) ? r3.then(f4) : Promise.resolve(f4(r3));
    };
  else if (limit === 5)
    return acc => {
      if (isPromiseLike(acc))
        return Promise.resolve(acc)
          .then(f1)
          .then(f2)
          .then(f3)
          .then(f4)
          .then(f5);
      const r1 = f1(acc);
      if (isPromiseLike(r1)) return r1.then(f2).then(f3).then(f4).then(f5);
      const r2 = f2(r1);
      if (isPromiseLike(r2)) return r2.then(f3).then(f4).then(f5);
      const r3 = f3(r2);
      if (isPromiseLike(r3)) return r3.then(f4).then(f5);
      const r4 = f4(r2);
      return isPromiseLike(r4) ? r4.then(f5) : Promise.resolve(f5(r4));
    };
  else return _operAsyncFallback([f1, f2, f3, f4, f5, ...restFns]);
}
