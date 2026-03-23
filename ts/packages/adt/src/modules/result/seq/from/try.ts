import type { SafeExecutionError } from "#result/execution.error.js";
import { mapErrSafely } from "#result/internal.js";
import { tryCatch } from "#utility/tryCatch.js";
import { err, ok, type Result } from "../../primitive.js";

export const fromTry =
  <E>(onError: (cause: unknown) => E) =>
  <T>(fn: () => T): Result<T, E> => {
    try {
      return ok(fn());
    } catch (cause) {
      return err(onError(cause));
    }
  };
export const fromTrySafe =
  <E>(onError: (cause: unknown) => E) =>
  <T>(fn: () => T): Result<T, E | SafeExecutionError> => {
    try {
      return ok(fn());
    } catch (cause) {
      return tryCatch(() => err(onError(cause)), mapErrSafely(cause));
    }
  };
export const fromTryRecover =
  <T>(onRecover: (cause: unknown) => T) =>
  (fn: () => T): Result<T, SafeExecutionError> => {
    try {
      return ok(fn());
    } catch (cause) {
      return tryCatch(() => ok(onRecover(cause)), mapErrSafely(cause));
    }
  };
export const fromTryAsync =
  <E>(onError: (cause: unknown) => E) =>
  async <T>(fn: () => Promise<T>): Promise<Result<T, E>> => {
    try {
      return ok(await fn());
    } catch (cause) {
      return err(onError(cause));
    }
  };

export const fromTryAsyncSafe =
  <E>(onError: (cause: unknown) => E) =>
  async <T>(
    fn: () => Promise<T>,
  ): Promise<Result<T, E | SafeExecutionError>> => {
    try {
      return ok(await fn());
    } catch (cause) {
      return tryCatch(() => err(onError(cause)), mapErrSafely(cause));
    }
  };

export const fromTryAsyncRecover =
  <T>(onRecover: (cause: unknown) => T) =>
  async (fn: () => T): Promise<Result<T, SafeExecutionError>> => {
    try {
      return ok(await fn());
    } catch (cause) {
      return tryCatch(() => ok(onRecover(cause)), mapErrSafely(cause));
    }
  };
