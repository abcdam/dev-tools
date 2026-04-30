import { fromTry, fromTryAsync } from "#result/core/from/try.js";
import type { Result } from "#result/primitive.js";
import type { ErrNotNever, ErrorContext } from "#result/result.internal.js";
import type { Oper, OperA } from "#utility/types/oper.js";

type Else<out T2, in E1, out E2> = <T1>(
  r: Result<T1, E1> & ErrNotNever<E1>,
) => Result<T1 | T2, E2>;
type ElseAsync<out T2, in E1, out E2> = <T1>(
  r: Result<T1, E1> & ErrNotNever<E1>,
) => Promise<Result<T1 | T2, E2>>;
export const orElse =
  <E1, T2, E2>(op: Oper<E1, Result<T2, E2>>): Else<T2, E1, E2> =>
  r =>
    r.ok === true ? r : op(r.err);

export const orElseAsync =
  <T2, E1, E2>(opA: OperA<E1, Result<T2, E2>>): ElseAsync<T2, E1, E2> =>
  r =>
    r.ok === true ? Promise.resolve(r) : opA(r.err);

export const orElseTry =
  <T2, E1, E2>(
    tryOp: Oper<E1, T2>,
    mapErrOp: Oper<ErrorContext, E2>,
  ): Else<T2, E1, E2> =>
  r =>
    r.ok === true ? r : fromTry(() => tryOp(r.err), mapErrOp);

export const orElseTryAsync =
  <T2, E1, E2>(
    tryOpA: OperA<E1, T2>,
    mapErrOp: Oper<ErrorContext, E2>,
  ): ElseAsync<T2, E1, E2> =>
  r =>
    r.ok === true
      ? Promise.resolve(r)
      : fromTryAsync(() => tryOpA(r.err), mapErrOp);
