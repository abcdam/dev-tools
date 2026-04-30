import type { Oper } from "#compose/index.js";
import { err, ok, type Result } from "../../primitive.js";
import type { ErrNotNever, OkNotNever } from "../../result.internal.js";

type MapOk<in T1, out T2> = <E>(
  r: Result<T1, E> & OkNotNever<T1>,
) => Result<T2, E>;
type MapErr<in E1, out E2> = <T1>(
  r: Result<T1, E1> & ErrNotNever<E1>,
) => Result<T1, E2>;

export const map =
  <T1, T2>(op: Oper<T1, T2>): MapOk<T1, T2> =>
  r =>
    r.ok === true ? ok(op(r.val)) : r;

export const mapErr =
  <E1, E2>(op: Oper<E1, E2>): MapErr<E1, E2> =>
  r =>
    r.ok === true ? r : err(op(r.err));
