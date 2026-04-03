import { fromTry, fromTryAsync } from "#result/core/from/try.js";
import type { OkNotNever } from "#result/internal.js";
import type { Result } from "../../primitive.js";

export const andThen = <T1, E1, T2 = T1, E2 = never>(
  result: Result<T1, E1> & OkNotNever<T1>,
  mapFn: (okValue: T1) => Result<T2, E2>,
): Result<T2, E1 | E2> => (result.ok === true ? mapFn(result.value) : result);

export const andThenAsync = <T1, E1, T2, E2>(
  result: Result<T1, E1> & OkNotNever<T1>,
  mapFn: (okValue: T1) => Promise<Result<T2, E2>>,
): Promise<Result<T2, E1 | E2>> =>
  result.ok === true ? mapFn(result.value) : Promise.resolve(result);

export const andThenTry = <T1, T2, E1, E2>(
  result: Result<T1, E1> & OkNotNever<T1>,
  tryMapFn: (okValue: T1) => T2,
  onError: (cause: unknown) => E2,
): Result<T2, E1 | E2> =>
  result.ok === true ? fromTry(() => tryMapFn(result.value), onError) : result;

export const andThenTryAsync = <T1, T2, E1, E2>(
  result: Result<T1, E1> & OkNotNever<T1>,
  tryMapFn: (okValue: T1) => Promise<T2>,
  onError: (cause: unknown) => E2,
): Promise<Result<T2, E1 | E2>> =>
  result.ok === true
    ? fromTryAsync(() => tryMapFn(result.value), onError)
    : Promise.resolve(result);
