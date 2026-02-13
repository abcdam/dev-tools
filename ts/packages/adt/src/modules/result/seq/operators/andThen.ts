import { fromTry } from "@result:core/from/fromTry";
import { fromTryAsync } from "@result:core/from/fromTryAsync";
import type { Result } from "@result:core/types";
import type { OkDefined } from "./types.js";

export const andThen =
  <T1, T2 = T1, E2 = never>(mapFn: (okValue: T1) => Result<T2, E2>) =>
  <E1>(result: Result<T1, E1> & OkDefined<T1>): Result<T2, E1 | E2> =>
    result.ok ? mapFn(result.value) : result;

export const andThenAsync =
  <T1, T2, E2>(mapFn: (okValue: T1) => Promise<Result<T2, E2>>) =>
  <E1>(result: Result<T1, E1> & OkDefined<T1>): Promise<Result<T2, E1 | E2>> =>
    result.ok
      ? mapFn(result.value)
      : // Don't know yet how to trick tsc to make inference work reliably
        // at call-site for a mixed union of Promise/Sync error types. this here
        // is safe because the promise type is unwrapped again in the pipeline.
        (result as unknown as Promise<Result<T2, E1 | E2>>);

export const andThenTry =
  <T1, T2, E2>(
    tryMapFn: (okValue: T1) => T2,
    onError: (cause: unknown) => E2,
  ) =>
  <E1>(result: Result<T1, E1>): Result<T2, E1 | E2> =>
    result.ok ? fromTry(() => tryMapFn(result.value), onError) : result;

export const andThenTryAsync =
  <T1, T2, E2>(
    tryMapFn: (okValue: T1) => Promise<T2>,
    onError: (cause: unknown) => E2,
  ) =>
  <E1>(result: Result<T1, E1>): Promise<Result<T2, E1 | E2>> =>
    result.ok
      ? fromTryAsync(() => tryMapFn(result.value), onError)
      : (result as unknown as Promise<Result<T2, E1 | E2>>);
/*
export const andThenAsync =
  <T1, T2, E2>(mapFn: (ok: T1) => Promise<Result<T2, E2>>) =>
  <E1>(result: Result<T1, E1> & OkDefined<T1>): Promise<Result<T2, E1 | E2>> =>
    result.ok
      ? mapFn(result.value)
      : // Don't know yet how to trick tsc to make inference work reliably
        // at call-site for a mixed union of Promise/Sync error types. this here
        // is safe because the promise type is unwrapped again in the pipeline.
        (result as unknown as Promise<Result<T2, E1 | E2>>);

*/
