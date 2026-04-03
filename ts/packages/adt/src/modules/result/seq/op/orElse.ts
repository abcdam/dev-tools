import { fromTry, fromTryAsync } from "#result/core/from/try.js";
import type { ErrNotNever } from "#result/internal.js";
import type { Result } from "../../primitive.js";
export const orElse =
  <E1, T2, E2 = E1>(recoverFn: (error: E1) => Result<T2, E2>) =>
  <T1>(result: Result<T1, E1> & ErrNotNever<E1>): Result<T1 | T2, E2> =>
    result.ok === true ? result : recoverFn(result.error);

export const orElseAsync =
  <T2, E1, E2 = E1>(recoverFn: (error: E1) => Promise<Result<T2, E2>>) =>
  <T1>(
    result: Result<T1, E1> & ErrNotNever<E1>,
  ): Promise<Result<T1 | T2, E2>> =>
    result.ok === true ? Promise.resolve(result) : recoverFn(result.error);

export const orElseAsync_Fast =
  <T2, E1, E2 = E1>(recoverFn: (error: E1) => Promise<Result<T2, E2>>) =>
  <T1>(
    result: Result<T1, E1> & ErrNotNever<E1>,
  ): Promise<Result<T1 | T2, E2>> =>
    result.ok === true
      ? (result as unknown as Promise<Result<T1, never>>)
      : recoverFn(result.error);
export const orElseTry =
  <T2, E1, E2 = E1>(
    tryRecoveryFn: (errValue: E1) => T2,
    onError: (cause: unknown) => E2,
  ) =>
  <T1>(result: Result<T1, E1>): Result<T1 | T2, E2> =>
    result.ok === true
      ? result
      : fromTry(() => tryRecoveryFn(result.error), onError);

export const orElseTryAsync =
  <T2, E1, E2 = E1>(
    tryRecoveryFn: (errValue: E1) => Promise<T2>,
    onError: (cause: unknown) => E2,
  ) =>
  <T1>(result: Result<T1, E1>): Promise<Result<T1 | T2, E2>> =>
    result.ok === true
      ? Promise.resolve(result)
      : fromTryAsync(() => tryRecoveryFn(result.error), onError);

export const orElseTryAsync_Fast =
  <T2, E1, E2 = E1>(
    tryRecoveryFn: (errValue: E1) => Promise<T2>,
    onError: (cause: unknown) => E2,
  ) =>
  <T1>(result: Result<T1, E1>): Promise<Result<T1 | T2, E2>> =>
    result.ok === true
      ? (result as unknown as Promise<Result<T1, never>>)
      : fromTryAsync(() => tryRecoveryFn(result.error), onError);
