import { fromTry, fromTryAsync } from "#result/core/from/try.js";
import type { ErrorContext, OkNotNever } from "#result/result.internal.js";
import type { Oper, OperA } from "#utility/types/oper.js";
import type { Result } from "../../primitive.js";

type Then<in T1, out T2, out E2> = <E1>(
  r: Result<T1, E1> & OkNotNever<T1>,
) => Result<T2, E1 | E2>;

type ThenAsync<in T1, out T2, out E2> = <E1>(
  r: Result<T1, E1> & OkNotNever<T1>,
) => Promise<Result<T2, E1 | E2>>;
export const andThen =
  <T1, T2, E2>(op: Oper<T1, Result<T2, E2>>): Then<T1, T2, E2> =>
  r =>
    r.ok === true ? op(r.val) : r;
export const andThenTry =
  <T1, T2, E2>(
    tryOp: Oper<T1, T2>,
    errOp: Oper<ErrorContext, E2>,
  ): Then<T1, T2, E2> =>
  r =>
    r.ok === true ? fromTry(() => tryOp(r.val), errOp) : r;

export const andThenAsync =
  <T1, T2, E2>(opA: OperA<T1, Result<T2, E2>>): ThenAsync<T1, T2, E2> =>
  r =>
    r.ok === true ? opA(r.val) : Promise.resolve(r);

export const andThenTryAsync =
  <T1, T2, E2>(
    tryOpA: OperA<T1, T2>,
    errOp: Oper<ErrorContext, E2>,
  ): ThenAsync<T1, T2, E2> =>
  r =>
    r.ok === true
      ? fromTryAsync(() => tryOpA(r.val), errOp)
      : Promise.resolve(r);
