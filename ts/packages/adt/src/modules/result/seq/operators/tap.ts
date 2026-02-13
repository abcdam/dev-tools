import {
  tapAsync as tapAsyncCore,
  tap as tapCore,
  tapErrAsync as tapErrAsyncCore,
  tapErr as tapErrCore,
} from "@result:core/operators/tap";
import type { Result } from "@result:core/types";
export const tap =
  <T>(tapFn: (okValue: T) => void) =>
  <E>(result: Result<T, E>): Result<T, E> =>
    tapCore(result, tapFn);

export const tapErr =
  <E>(tapFn: (errValue: E) => void) =>
  <T>(result: Result<T, E>): Result<T, E> =>
    tapErrCore(result, tapFn);

export const tapAsync =
  <T>(tapFn: (okValue: T) => Promise<void>) =>
  <E>(result: Result<T, E>): Promise<Result<T, E>> =>
    tapAsyncCore(result, tapFn);

export const tapErrAsync =
  <E>(tapFn: (errValue: E) => Promise<void>) =>
  <T>(result: Result<T, E>): Promise<Result<T, E>> =>
    tapErrAsyncCore(result, tapFn);
