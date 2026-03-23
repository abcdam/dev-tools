import type { Option } from "../../primitive.js";

export const orElse = <T1, T2 = T1>(
  opt: Option<T1>,
  recoverFn: () => Option<T2>,
): Option<T1 | T2> => (opt.exists === true ? opt : recoverFn());

export const orElseAsync = <T1, T2 = T1>(
  opt: Option<T1>,
  recoverFn: () => Promise<Option<T2>>,
): Promise<Option<T1 | T2>> =>
  opt.exists === true ? Promise.resolve(opt) : recoverFn();
