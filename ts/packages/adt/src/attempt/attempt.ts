import { err, ok } from "@result/primitives";
import type { Result, ResultAsync } from "@result/types";
import { SafeExecutionError } from "./errors";

const toSafeErrorMapper =
  <E>(onError: (cause: unknown) => E) =>
  (originalError: unknown): E | SafeExecutionError => {
    try {
      return onError(originalError);
    } catch (mapperError) {
      return new SafeExecutionError(originalError, mapperError);
    }
  };

/**
 * Executes a function and captures errors.
 * * @warning If `onError` throws, this function will throw.
 */
export const attempt = <T, E>(
  fn: () => T,
  onError: (cause: unknown) => E,
): Result<T, E> => {
  try {
    return ok(fn());
  } catch (e) {
    return err(onError(e));
  }
};

export const attemptSafe = <T, E>(
  fn: () => T,
  onError: (cause: unknown) => E,
): Result<T, E | SafeExecutionError> => attempt(fn, toSafeErrorMapper(onError));

export const attemptAsync = async <T, E>(
  fn: () => Promise<T>,
  onError: (cause: unknown) => E,
): ResultAsync<T, E> => {
  try {
    const value = await fn();
    return ok(value);
  } catch (exception) {
    return err(onError(exception));
  }
};

export const attemptAsyncSafe = async <T, E>(
  fn: () => Promise<T>,
  onError: (cause: unknown) => E,
): ResultAsync<T, E | SafeExecutionError> =>
  attemptAsync(fn, toSafeErrorMapper(onError));
