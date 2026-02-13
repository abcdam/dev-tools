import type { Oper } from "./types.js";

export function oper<A>(): Oper<A, A>;

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

export function oper(...fns: any[]): any {
  return (initialValue: any) => {
    let acc = initialValue;
    for (let i = 0; i < fns.length; i++) acc = fns[i](acc);
    return acc;
  };
}
