import { err, ok } from "@result:core/primitives";
import type { Result } from "@result:core/types";
import type { SafeExecutionError } from "./errors.js";
import { toSafeErrorMapper } from "./internal.js";

/**
 * Executes a function and captures errors.
 * * @warning If `onError` throws, this function will throw.
 */
export const fromTry = <T, E>(
  fn: () => T,
  onError: (cause: unknown) => E,
): Result<T, E> => {
  try {
    const value = fn();
    return ok(value);
  } catch (e) {
    return err(onError(e));
  }
};

export const fromTrySafe = <T, E>(
  fn: () => T,
  onError: (cause: unknown) => E,
): Result<T, E | SafeExecutionError> => fromTry(fn, toSafeErrorMapper(onError));
