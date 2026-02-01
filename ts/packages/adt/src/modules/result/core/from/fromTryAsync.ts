import { err, ok } from "@result:core/primitives";
import type { Result } from "@result:core/types";
import type { SafeExecutionError } from "./errors.js";
import { toSafeErrorMapper } from "./internal.js";

export const fromTryAsync = async <T, E>(
  fn: () => Promise<T>,
  onError: (cause: unknown) => E,
): Promise<Result<T, E>> => {
  try {
    const value = await fn();
    return ok(value);
  } catch (exception) {
    return err(onError(exception));
  }
};

export const fromTryAsyncSafe = <T, E>(
  fn: () => Promise<T>,
  onError: (cause: unknown) => E,
): Promise<Result<T, E | SafeExecutionError>> =>
  fromTryAsync(fn, toSafeErrorMapper(onError));
