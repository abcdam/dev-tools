import type { Option } from "@option:core/types";
export const orElse = <T1, T2 = T1>(
  opt: Option<T1>,
  recoverFn: () => Option<T2>,
): Option<T1 | T2> => (opt.exists ? opt : recoverFn());

export const orElseAsync = <T1, T2 = T1>(
  opt: Option<T1>,
  recoverFn: () => Promise<Option<T2>>,
): Promise<Option<T1 | T2>> =>
  opt.exists ? (opt as unknown as Promise<Option<T2>>) : recoverFn();
