import { _NONE } from "#option/construct.internal.js";
import type { None, Option } from "../../primitive.js";
export const andThen: <T1, T2 = T1>(
  mapFn: (val: T1) => Option<T2>,
) => (o: Option<T1>) => Option<T2> = mapFn => opt =>
  opt.exists === true ? mapFn(opt.val) : _NONE;

// TODO ADAPT
export const andThenAsync: <T1, T2 = T1>(
  mapFn: (val: T1) => Promise<Option<T2>>,
) => (opt: Option<T1>) => Promise<Option<T2>> = mapFn => opt =>
  opt.exists === true ? mapFn(opt.val) : Promise.resolve(_NONE);

// TODO REMOVE
export const andThenAsync_Fast =
  <T1, T2 = T1>(mapFn: (val: T1) => Promise<Option<T2>>) =>
  (opt: Option<T1>): Promise<Option<T2>> =>
    opt.exists === true ? mapFn(opt.val) : (_NONE as unknown as Promise<None>);
