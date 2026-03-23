import { mapErrSafely } from "#result/internal.js";
import { tryCatch } from "#utility/tryCatch.js";
import type { SafeExecutionError } from "../../execution.error.js";
import { err, ok, type Result } from "../../primitive.js";

/**
 * Executes a function and captures errors.
 * * @warning If `onError` throws, this function will throw.
 */
export const fromTry = <T, E>(
  fn: () => T,
  onError: (cause: unknown) => E,
): Result<T, E> => {
  try {
    return ok(fn());
  } catch (cause) {
    return err(onError(cause));
  }
};

export const fromTrySafe = <T, E>(
  fn: () => T,
  onError: (cause: unknown) => E,
): Result<T, E | SafeExecutionError> => {
  try {
    return ok(fn());
  } catch (cause) {
    return tryCatch(() => err(onError(cause)), mapErrSafely(cause));
  }
};

export const fromTryRecover = <T>(
  fn: () => T,
  onRecover: (cause: unknown) => T,
): Result<T, SafeExecutionError> => {
  try {
    return ok(fn());
  } catch (cause) {
    return tryCatch(() => ok(onRecover(cause)), mapErrSafely(cause));
  }
};

export const fromTryAsync = async <T, E>(
  fn: () => Promise<T>,
  onError: (cause: unknown) => E,
): Promise<Result<T, E>> => {
  try {
    return ok(await fn());
  } catch (cause) {
    return err(onError(cause));
  }
};

export const fromTryAsyncSafe = async <T, E>(
  fn: () => Promise<T>,
  onError: (cause: unknown) => E,
): Promise<Result<T, E | SafeExecutionError>> => {
  try {
    return ok(await fn());
  } catch (cause) {
    return tryCatch(() => err(onError(cause)), mapErrSafely(cause));
  }
};

export const fromTryAsyncRecover = async <T>(
  fn: () => Promise<T>,
  onRecover: (cause: unknown) => T,
): Promise<Result<T, SafeExecutionError>> => {
  try {
    return ok(await fn());
  } catch (cause) {
    return tryCatch(() => ok(onRecover(cause)), mapErrSafely(cause));
  }
};
