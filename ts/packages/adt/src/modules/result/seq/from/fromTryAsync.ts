import type { SafeExecutionError } from "@result:core/from/errors";
import {
  fromTryAsync as fromTryAsyncCore,
  fromTryAsyncSafe as fromTryAsyncSafeCore,
} from "@result:core/from/fromTryAsync";
import type { Result } from "../types.js";

export const fromTryAsync =
  <E>(onError: (cause: unknown) => E) =>
  <T>(fn: () => Promise<T>): Promise<Result<T, E>> =>
    fromTryAsyncCore(fn, onError);

export const fromTryAsyncSafe =
  <E>(onError: (cause: unknown) => E) =>
  <T>(fn: () => Promise<T>): Promise<Result<T, E | SafeExecutionError>> =>
    fromTryAsyncSafeCore(fn, onError);
