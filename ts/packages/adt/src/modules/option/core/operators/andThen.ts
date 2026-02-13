import type { Option } from "@option:core/types";

export const andThen = <T1, T2 = T1>(
  opt: Option<T1>,
  mapFn: (someValue: T1) => Option<T2>,
): Option<T2> => (opt.exists ? mapFn(opt.value) : opt);

export const andThenAsync = <T1, T2 = T1>(
  opt: Option<T1>,
  mapFn: (someValue: T1) => Promise<Option<T2>>,
): Promise<Option<T2>> =>
  opt.exists ? mapFn(opt.value) : (opt as unknown as Promise<Option<T2>>);
