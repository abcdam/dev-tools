import type { Oper } from "./types.js";
export type OperAwaitable<in In, out Out> = Oper<
  Awaited<In>,
  Out | Promise<Out>
>;
export type UnknownFn = (v: unknown) => unknown;
export type UnknPL = PromiseLike<unknown>;
export type UnknP = Promise<unknown>;

export type PromiseFn = (p: unknown) => UnknP;

export const _toPromise: PromiseFn = p => Promise.resolve(p);
export type OpsItems<
  N extends number,
  R extends UnknownFn[] = [],
> = R["length"] extends N ? R : OpsItems<N, [UnknownFn, ...R]>;
export type ChainFn<N extends number> = (
  p: UnknPL,
  ...fns: OpsItems<N>
) => UnknP;

export const assertOpsArgs = (
  fnSym: string,
  ops: UnknownFn[],
  minLength: number,
  opCount: number,
): void => {
  if (opCount < minLength)
    throw new TypeError(
      `[abcd/adt] ${fnSym}: argument count violation. Expected: ${minLength} or more, got: ${opCount}`,
    );
  let sawWeirdness = false;
  ops.forEach((o, idx) => {
    const type = typeof o;
    const isFn = type === "function";
    if (isFn && sawWeirdness)
      throw new TypeError(
        `[abcd/adt] ${fnSym}: invalid argument type at position ${idx}. Expected: function, got: ${type}`,
      );
    sawWeirdness = !isFn;
  });
};
export const _chain1: ChainFn<1> = (p, f1) => _toPromise(p).then(f1);
export const _chain2: ChainFn<2> = (p, f1, f2) =>
  _toPromise(p).then(f1).then(f2);
export const _chain3: ChainFn<3> = (p, f1, f2, f3) =>
  _toPromise(p).then(f1).then(f2).then(f3);
export const _chain4: ChainFn<4> = (p, f1, f2, f3, f4) =>
  _toPromise(p).then(f1).then(f2).then(f3).then(f4);
export const _chain5: ChainFn<5> = (p, f1, f2, f3, f4, f5) =>
  _toPromise(p).then(f1).then(f2).then(f3).then(f4).then(f5);
export const _chain6: ChainFn<6> = (p, f1, f2, f3, f4, f5, f6) =>
  _toPromise(p).then(f1).then(f2).then(f3).then(f4).then(f5).then(f6);
