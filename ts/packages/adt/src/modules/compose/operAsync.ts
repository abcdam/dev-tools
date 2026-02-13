import type { OperAsync } from "./types.js";

export function operAsync<A>(): OperAsync<A, A>;

export function operAsync<A, B>(f1: OperAsync<A, B>): OperAsync<A, B>;

export function operAsync<A, B, C>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
): OperAsync<A, C>;

export function operAsync<A, B, C, D>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
): OperAsync<A, D>;

export function operAsync<A, B, C, D, E>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
): OperAsync<A, E>;

export function operAsync<A, B, C, D, E, F>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
): OperAsync<A, F>;

export function operAsync<A, B, C, D, E, F, G>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
): OperAsync<A, G>;

export function operAsync<A, B, C, D, E, F, G, H>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
): OperAsync<A, H>;

export function operAsync<A, B, C, D, E, F, G, H, I>(
  f1: OperAsync<A, B>,
  f2: OperAsync<B, C>,
  f3: OperAsync<C, D>,
  f4: OperAsync<D, E>,
  f5: OperAsync<E, F>,
  f6: OperAsync<F, G>,
  f7: OperAsync<G, H>,
  f8: OperAsync<H, I>,
): OperAsync<A, I>;

export function operAsync<A, B, C, D, E, F, G, H, I, J>(
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

export function operAsync<A, B, C, D, E, F, G, H, I, J, K>(
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

export function operAsync<A, B, C, D, E, F, G, H, I, J, K, L>(
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

export function operAsync<A, B, C, D, E, F, G, H, I, J, K, L, M>(
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

export function operAsync(...fns: any[]): any {
  return (initialValue: any) => {
    let acc = initialValue;
    for (let i = 0; i < fns.length; i++)
      acc =
        acc instanceof Promise || typeof (acc as any).then === "function"
          ? acc.then(fns[i])
          : fns[i](acc);
    return Promise.resolve(acc);
  };
}
