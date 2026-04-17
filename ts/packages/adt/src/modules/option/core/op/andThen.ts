import { _NONE } from "#option/const.js";
import type { Option } from "../../primitive.js";

export const andThen = <T1, T2 = T1>(
  opt: Option<T1>,
  mapFn: (someValue: T1) => Option<T2>,
): Option<T2> => (opt.exists === true ? mapFn(opt.val) : _NONE);

export const andThenAsync = <T1, T2 = T1>(
  opt: Option<T1>,
  mapFn: (someValue: T1) => Promise<Option<T2>>,
): Promise<Option<T2>> =>
  opt.exists === true ? mapFn(opt.val) : Promise.resolve(_NONE);
