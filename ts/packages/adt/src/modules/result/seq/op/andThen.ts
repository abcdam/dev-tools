import { fromTry, fromTryAsync } from "#result/core/from/try.js";
import type { OkNotNever } from "#result/types.internal.js";
import type { Result } from "../../primitive.js";

export const andThen =
  <T1, T2 = T1, E2 = never>(mapFn: (okValue: T1) => Result<T2, E2>) =>
  <E1>(result: Result<T1, E1> & OkNotNever<T1>): Result<T2, E1 | E2> =>
    result.ok === true ? mapFn(result.val) : result;

export const andThenAsync =
  <T1, T2, E2>(mapFn: (okValue: T1) => Promise<Result<T2, E2>>) =>
  <E1>(result: Result<T1, E1> & OkNotNever<T1>): Promise<Result<T2, E1 | E2>> =>
    result.ok === true ? mapFn(result.val) : Promise.resolve(result);

export const andThenAsync_Fast =
  <T1, T2, E2>(mapFn: (okValue: T1) => Promise<Result<T2, E2>>) =>
  <E1>(result: Result<T1, E1> & OkNotNever<T1>): Promise<Result<T2, E1 | E2>> =>
    result.ok === true
      ? mapFn(result.val)
      : (result as unknown as Promise<Result<never, E1>>);

export const andThenTry =
  <T1, T2, E2>(
    tryMapFn: (okValue: T1) => T2,
    onError: (cause: unknown) => E2,
  ) =>
  <E1>(result: Result<T1, E1> & OkNotNever<T1>): Result<T2, E1 | E2> =>
    result.ok === true ? fromTry(() => tryMapFn(result.val), onError) : result;

export const andThenTryAsync =
  <T1, T2, E2>(
    tryMapFn: (okValue: T1) => Promise<T2>,
    onError: (cause: unknown) => E2,
  ) =>
  <E1>(result: Result<T1, E1> & OkNotNever<T1>): Promise<Result<T2, E1 | E2>> =>
    result.ok === true
      ? fromTryAsync(() => tryMapFn(result.val), onError)
      : Promise.resolve(result);

export const andThenTryAsync_Fast =
  <T1, T2, E2>(
    tryMapFn: (okValue: T1) => Promise<T2>,
    onError: (cause: unknown) => E2,
  ) =>
  <E1>(result: Result<T1, E1> & OkNotNever<T1>): Promise<Result<T2, E1 | E2>> =>
    result.ok === true
      ? fromTryAsync(() => tryMapFn(result.val), onError)
      : (result as unknown as Promise<Result<never, E1>>);
