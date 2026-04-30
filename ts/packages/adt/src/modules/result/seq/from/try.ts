import type { SafeExecutionError } from "#result/execution.error.js";
import {
  contextProvider,
  type ErrorContext,
  mapErrSafely,
} from "#result/result.internal.js";
import { tryCatch } from "#utility/misc/tryCatch.js";
import type { Oper, OperAThunk, OperThunk } from "#utility/types/oper.js";
import { err, ok, type Result } from "../../primitive.js";

type FromTry<out E> = <T>(thunk: OperThunk<T>) => Result<T, E>;
type FromTryAsync<out E> = <T>(thunkA: OperAThunk<T>) => Promise<Result<T, E>>;
type FromTryRecover<in out T, out E> = (thunk: OperThunk<T>) => Result<T, E>;

type FromTryRecoverAsync<in out T, out E> = (
  thunk: OperAThunk<T>,
) => Promise<Result<T, E>>;
export const fromTry =
  <E>(errOp: Oper<ErrorContext, E>): FromTry<E> =>
  thunk => {
    try {
      return ok(thunk());
    } catch (cause) {
      return err(errOp(contextProvider(cause)));
    }
  };
export const fromTrySafe =
  <E>(errOp: Oper<ErrorContext, E>): FromTry<E | SafeExecutionError> =>
  thunk => {
    try {
      return ok(thunk());
    } catch (cause) {
      return tryCatch(
        () => err(errOp(contextProvider(cause))),
        mapErrSafely(cause),
      );
    }
  };
export const fromTryRecover =
  <T>(errOp: Oper<ErrorContext, T>): FromTryRecover<T, SafeExecutionError> =>
  thunk => {
    try {
      return ok(thunk());
    } catch (cause) {
      return tryCatch(
        () => ok(errOp(contextProvider(cause))),
        mapErrSafely(cause),
      );
    }
  };

export const fromTryAsync =
  <E>(errOp: Oper<ErrorContext, E>): FromTryAsync<E> =>
  async thunkA => {
    try {
      return ok(await thunkA());
    } catch (cause) {
      return err(errOp(contextProvider(cause)));
    }
  };
export const fromTrySafeAsync =
  <E>(errOp: Oper<ErrorContext, E>): FromTryAsync<E | SafeExecutionError> =>
  async thunkA => {
    try {
      return ok(await thunkA());
    } catch (cause) {
      return tryCatch(
        () => err(errOp(contextProvider(cause))),
        mapErrSafely(cause),
      );
    }
  };

export const fromTryRecoverAsync =
  <T>(
    errOp: Oper<ErrorContext, T>,
  ): FromTryRecoverAsync<T, SafeExecutionError> =>
  async thunkA => {
    try {
      return ok(await thunkA());
    } catch (cause) {
      return tryCatch(
        () => ok(errOp(contextProvider(cause))),
        mapErrSafely(cause),
      );
    }
  };
