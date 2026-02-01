import type { SafeExecutionError } from "@result:core/from/errors";
import {
  fromTry as fromTryCore,
  fromTrySafe as fromTrySafeCore,
} from "@result:core/from/fromTry";
import type { Result } from "../types.js";

export const fromTry =
  <E>(onError: (cause: unknown) => E) =>
  <T>(fn: () => T): Result<T, E> =>
    fromTryCore(fn, onError);

export const fromTrySafe =
  <E>(onError: (cause: unknown) => E) =>
  <T>(fn: () => T): Result<T, E | SafeExecutionError> =>
    fromTrySafeCore(fn, onError);
