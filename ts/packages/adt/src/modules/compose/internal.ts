import type { OperUnknown, PromUnknown } from "#intern/types";

export type PromUnknownFn = (p: unknown) => PromUnknown;

export const F_PROM_RSLV: PromUnknownFn = Promise.resolve;
export type OpsItems<
  N extends number,
  R extends OperUnknown[] = [],
> = R["length"] extends N ? R : OpsItems<N, [OperUnknown, ...R]>;
export type ChainFn<N extends number> = (
  p: PromiseLike<unknown>,
  ...fns: OpsItems<N>
) => PromUnknown;

export const assertOpsArgs = (
  fnSym: string,
  ops: any[],
  minLength: number,
  opCount: number,
): void => {
  if (opCount < minLength) {
    const msg = `[abcd/adt] ${fnSym}: argument count violation. Expected: ${minLength} or more, got: ${opCount}`;
    console.error(msg);
    throw new TypeError(msg);
  }
  let sawWeirdness = false;
  ops.forEach((o, idx) => {
    const type = typeof o;
    const isFn = type === "function";
    if (isFn && sawWeirdness) {
      const msg = `[abcd/adt] ${fnSym}: invalid argument type at position ${idx}. Expected: function, got: ${type}`;
      console.error(msg);
      throw new TypeError(msg);
    }
    sawWeirdness = !isFn;
  });
};
export const _chain1: ChainFn<1> = (p, f1) => F_PROM_RSLV(p).then(f1);
export const _chain2: ChainFn<2> = (p, f1, f2) =>
  F_PROM_RSLV(p).then(f1).then(f2);
export const _chain3: ChainFn<3> = (p, f1, f2, f3) =>
  F_PROM_RSLV(p).then(f1).then(f2).then(f3);
export const _chain4: ChainFn<4> = (p, f1, f2, f3, f4) =>
  F_PROM_RSLV(p).then(f1).then(f2).then(f3).then(f4);
export const _chain5: ChainFn<5> = (p, f1, f2, f3, f4, f5) =>
  F_PROM_RSLV(p).then(f1).then(f2).then(f3).then(f4).then(f5);
export const _chain6: ChainFn<6> = (p, f1, f2, f3, f4, f5, f6) =>
  F_PROM_RSLV(p).then(f1).then(f2).then(f3).then(f4).then(f5).then(f6);
