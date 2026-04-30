import type { Oper } from "#compose/index.js";
import { contextProvider, mapErrSafely } from "#result/result.internal.js";
import { tryCatch } from "#utility/misc/tryCatch.js";
import type {
  ErrorContext,
  SafeExecutionError,
} from "../../execution.error.js";
import { err, ok, type Result } from "../../primitive.js";

/**
 * Executes a function and captures errors.
 * * @warning If `onError` throws, this function will throw.
 */
export const fromTry = <T, E>(
  fn: () => T,
  onError: Oper<ErrorContext, E>,
): Result<T, E> => {
  try {
    return ok(fn());
  } catch (cause) {
    return err(onError(contextProvider(cause)));
  }
};

export const fromTrySafe = <T, E>(
  fn: () => T,
  onError: Oper<ErrorContext, E>,
): Result<T, E | SafeExecutionError> => {
  try {
    return ok(fn());
  } catch (cause) {
    return tryCatch(
      () => err(onError(contextProvider(cause))),
      mapErrSafely(cause),
    );
  }
};

export const fromTryRecover = <T>(
  fn: () => T,
  onRecover: Oper<ErrorContext, T>,
): Result<T, SafeExecutionError> => {
  try {
    return ok(fn());
  } catch (cause) {
    return tryCatch(
      () => ok(onRecover(contextProvider(cause))),
      mapErrSafely(cause),
    );
  }
};

export const fromTryAsync = async <T, E>(
  fn: () => Promise<T>,
  onError: Oper<ErrorContext, E>,
): Promise<Result<T, E>> => {
  try {
    return ok(await fn());
  } catch (cause) {
    return err(onError(contextProvider(cause)));
  }
};

export const fromTryAsyncSafe = async <T, E>(
  fn: () => Promise<T>,
  onError: Oper<ErrorContext, E>,
): Promise<Result<T, E | SafeExecutionError>> => {
  try {
    return ok(await fn());
  } catch (cause) {
    return tryCatch(
      () => err(onError(contextProvider(cause))),
      mapErrSafely(cause),
    );
  }
};

export const fromTryAsyncRecover = async <T>(
  fn: () => Promise<T>,
  onRecover: Oper<ErrorContext, T>,
): Promise<Result<T, SafeExecutionError>> => {
  try {
    return ok(await fn());
  } catch (cause) {
    return tryCatch(
      () => ok(onRecover(contextProvider(cause))),
      mapErrSafely(cause),
    );
  }
};
