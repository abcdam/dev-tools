import { isPromiseLike } from "#utility/guard.js";
import { _asyncTail, _seqAsyncEager } from "./internal.js";
import type { OperAsync } from "./types.js";

/**
 *
 * This is a somewhat raw but performant implementation of an async pipeline
 * that processes input synchronously until the first promise is encountered.
 *
 * **IMPORTANT**
 * It is the responsibility of the consumer to ensure:
 * * **Error Management:** strictly avoid throwable side-effects (use e.g. `Result<T,E>`)
 * * **Non-Nullable Values:** Values must never be `null` or `undefined` (use e.g. `Option<T>`)
 *
 * > Ignoring these measures will lead to sweat and tears.
 *
 * @param initial - intial value
 * @param fns unary operations (single input functions) to apply in sequence.
 * @returns a promise that resolves to the final output value
 *
 * @see {@link OperAsync}
 */
export function seqAsyncFast<A, B, C>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
): Promise<C>;
export function seqAsyncFast<A, B, C, D>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
): Promise<D>;
export function seqAsyncFast<A, B, C, D, E>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
): Promise<E>;
export function seqAsyncFast<A, B, C, D, E, F>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
): Promise<F>;
export function seqAsyncFast<A, B, C, D, E, F, G>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
): Promise<G>;
export function seqAsyncFast<A, B, C, D, E, F, G, H>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
): Promise<H>;
export function seqAsyncFast<A, B, C, D, E, F, G, H, I>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
  f8: OperAsync<H, I>,
): Promise<I>;
export function seqAsyncFast<A, B, C, D, E, F, G, H, I, J>(
  initial: A,
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
  f8: OperAsync<H, I>,
  f9: OperAsync<I, J>,
): Promise<J>;
export function seqAsyncFast<A, B, C, D, E, F, G, H, I, J, K>(
  initial: A,
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
): Promise<K>;
export function seqAsyncFast<A, B, C, D, E, F, G, H, I, J, K, L>(
  initial: A,
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
): Promise<L>;
export function seqAsyncFast<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  initial: A,
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
): Promise<M>;

export function seqAsyncFast(
  initialValue: unknown,
  f1: any,
  f2: any,
  f3?: any,
  f4?: any,
  f5?: any,
  ...restFns: Array<(v: unknown) => unknown>
): unknown {
  const limit = arguments.length - 1;
  if (limit === 2) {
    if (isPromiseLike(initialValue))
      return Promise.resolve(initialValue).then(f1).then(f2);
    const r = f1(initialValue);
    return isPromiseLike(r) ? r.then(f2) : Promise.resolve(f2(r));
  } else if (limit === 3) {
    if (isPromiseLike(initialValue))
      return Promise.resolve(initialValue).then(f1).then(f2).then(f3);
    const r1 = f1(initialValue);
    if (isPromiseLike(r1)) return r1.then(f2).then(f3);
    const r2 = f2(r1);
    return isPromiseLike(r2) ? r2.then(f3) : Promise.resolve(f3(r2));
  } else if (limit === 4) {
    if (isPromiseLike(initialValue))
      return Promise.resolve(initialValue).then(f1).then(f2).then(f3).then(f4);
    const r1 = f1(initialValue);
    if (isPromiseLike(r1)) return r1.then(f2).then(f3).then(f4);
    const r2 = f2(r1);
    if (isPromiseLike(r2)) return r2.then(f3).then(f4);
    const r3 = f3(r2);
    return isPromiseLike(r3) ? r3.then(f4) : Promise.resolve(f4(r3));
  } else if (limit === 5) {
    if (isPromiseLike(initialValue))
      return Promise.resolve(initialValue)
        .then(f1)
        .then(f2)
        .then(f3)
        .then(f4)
        .then(f5);
    const r1 = f1(initialValue);
    if (isPromiseLike(r1)) return r1.then(f2).then(f3).then(f4).then(f5);
    const r2 = f2(r1);
    if (isPromiseLike(r2)) return r2.then(f3).then(f4).then(f5);
    const r3 = f3(r2);
    if (isPromiseLike(r3)) return r3.then(f4).then(f5);
    const r4 = f4(r2);
    return isPromiseLike(r4) ? r4.then(f5) : Promise.resolve(f5(r4));
  } else return _seqAsyncEager(initialValue, [f1, f2, f3, f4, f5, ...restFns]);
}
