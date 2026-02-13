import { fromTry } from "@result:core/from/fromTry";
import { fromTryAsync } from "@result:core/from/fromTryAsync";
import type { Result } from "@result:core/types";
import type { ErrDefined } from "./types.js";
export const orElse =
  <E1, T2, E2 = E1>(recoverFn: (error: E1) => Result<T2, E2>) =>
  <T1>(result: Result<T1, E1> & ErrDefined<E1>): Result<T1 | T2, E2> =>
    result.ok ? result : recoverFn(result.error);

export const orElseAsync =
  <T2, E1, E2 = E1>(recoverFn: (error: E1) => Promise<Result<T2, E2>>) =>
  <T1>(result: Result<T1, E1> & ErrDefined<E1>): Promise<Result<T1 | T2, E2>> =>
    result.ok
      ? (result as unknown as Promise<Result<T1, E2>>)
      : recoverFn(result.error);

export const orElseTry =
  <T2, E1, E2 = E1>(
    tryRecoveryFn: (errValue: E1) => T2,
    onError: (cause: unknown) => E2,
  ) =>
  <T1>(result: Result<T1, E1>): Result<T1 | T2, E2> =>
    result.ok ? result : fromTry(() => tryRecoveryFn(result.error), onError);

export const orElseTryAsync =
  <T2, E1, E2 = E1>(
    tryRecoveryFn: (errValue: E1) => Promise<T2>,
    onError: (cause: unknown) => E2,
  ) =>
  <T1>(result: Result<T1, E1>): Promise<Result<T1 | T2, E2>> =>
    result.ok
      ? (result as unknown as Promise<Result<T1, E2>>)
      : fromTryAsync(() => tryRecoveryFn(result.error), onError);

/*
     * export const orElseAsync =
  <const E1, U, E2>(recoverFn: (error: E1) => Promise<Result<U, E2>>) =>
  <T>(result: Result<T, E1> & ErrDefined<E1>): Promise<Result<U | T, E2>> =>
    result.ok
      ? // Don't know yet how to trick tsc to make inference work reliably
        // at call-site for a union of mixed Promise & Sync success types without breaking pipeline inference. this here
        // is safe because the promise type is unwrapped again in the pipeline.
        (result as unknown as Promise<Result<U | T, E2>>)
      : recoverFn(result.error);

     */
