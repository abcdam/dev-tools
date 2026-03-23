import type { None, Option } from "../../primitive.js";
export const andThen =
  <T1, T2 = T1>(mapFn: (someValue: T1) => Option<T2>) =>
  (opt: Option<T1>): Option<T2> =>
    opt.exists === true ? mapFn(opt.value) : opt;

export const andThenAsync =
  <T1, T2 = T1>(mapFn: (someValue: T1) => Promise<Option<T2>>) =>
  (opt: Option<T1>): Promise<Option<T2>> =>
    opt.exists === true ? mapFn(opt.value) : Promise.resolve(opt);

export const andThenAsync_Fast =
  <T1, T2 = T1>(mapFn: (someValue: T1) => Promise<Option<T2>>) =>
  (opt: Option<T1>): Promise<Option<T2>> =>
    opt.exists === true ? mapFn(opt.value) : (opt as unknown as Promise<None>);
