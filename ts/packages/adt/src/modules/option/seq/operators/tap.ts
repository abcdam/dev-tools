import {
  tapAsync as tapAsyncCore,
  tap as tapCore,
  tapNoneAsync as tapNoneAsyncCore,
  tapNone as tapNpneCore,
} from "@option:core/operators/tap";
import type { Option } from "@option:core/types";
export const tap =
  <T>(tapFn: (someValue: T) => void) =>
  (opt: Option<T>): Option<T> =>
    tapCore(opt, tapFn);

export const tapNone =
  (tapFn: () => void) =>
  <T>(opt: Option<T>): Option<T> =>
    tapNpneCore(opt, tapFn);

export const tapAsync =
  <T>(tapFn: (someValue: T) => Promise<void>) =>
  (opt: Option<T>): Promise<Option<T>> =>
    tapAsyncCore(opt, tapFn);

export const tapNoneAsync =
  <T>(tapFn: () => Promise<void>) =>
  (opt: Option<T>): Promise<Option<T>> =>
    tapNoneAsyncCore(opt, tapFn);
