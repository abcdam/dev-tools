import {
  orElseAsync as orElseAsyncCore,
  orElse as orElseCore,
} from "@option:core/operators/orElse";
import type { Option } from "@option:core/types";
export const orElse =
  <T2>(recoverFn: () => Option<T2>) =>
  <T1>(opt: Option<T1>): Option<T1 | T2> =>
    orElseCore(opt, recoverFn);

export const orElseAsync =
  <T1, T2 = T1>(recoverFn: () => Promise<Option<T2>>) =>
  (opt: Option<T1>): Promise<Option<T1 | T2>> =>
    orElseAsyncCore(opt, recoverFn);
