import { isPromiseLike } from "#utility/guard.js";
import type { Oper } from "./types.js";
export type UnknownFn = (v: unknown) => unknown;
export const _asyncTail = (
  pl: PromiseLike<unknown>,
  fns: UnknownFn[],
  startIndex: number = 0,
): Promise<unknown> => {
  const limit = fns.length;
  let p = Promise.resolve(pl);
  for (let i = startIndex; i < limit; i++) p = p.then(fns[i]);
  return p;
};
export const _seqAsyncEager = (acc: unknown, fns: any[]): unknown => {
  const totalLimit = fns.length;
  for (let i = 0; i < totalLimit; i++) {
    if (isPromiseLike(acc)) return _asyncTail(acc, fns, i);
    else acc = fns[i](acc);
  }
  return Promise.resolve(acc);
};

export const _operAsyncFallback: Oper<
  UnknownFn[],
  Oper<unknown, unknown>
> = fns => {
  const limit = fns.length;
  return acc => {
    for (let i = 0; i < limit; i++) {
      if (isPromiseLike(acc)) return _asyncTail(acc, fns, i);
      else acc = fns[i]!(acc);
    }
    return Promise.resolve(acc);
  };
};
