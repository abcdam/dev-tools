import {
  andThenAsync as andThenAsyncCore,
  andThen as andThenCore,
} from "@option:core/operators/andThen";
import type { Option } from "@option:core/types";
export const andThen =
  <T1, T2 = T1>(mapFn: (someValue: T1) => Option<T2>) =>
  (opt: Option<T1>): Option<T2> =>
    andThenCore(opt, mapFn);

export const andThenAsync =
  <T1, T2 = T1>(mapFn: (someValue: T1) => Promise<Option<T2>>) =>
  (opt: Option<T1>): Promise<Option<T2>> =>
    andThenAsyncCore(opt, mapFn);
