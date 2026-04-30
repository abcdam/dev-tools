import type { Oper } from "#utility/types/oper.js";
import type { Result } from "../../primitive.js";

type UnwrapOr<out T2> = <T1, E>(r: Result<T1, E>) => T1 | T2;
type UnwrapElse<in E, out T2> = <T1>(r: Result<T1, E>) => T1 | T2;

type UnwrapErrOr<out E2> = <T1, E>(r: Result<T1, E>) => E | E2;
type UnwrapErrElse<in T, out E2> = <E1>(r: Result<T, E1>) => E1 | E2;

export const unwrapOr: <T2>(default_: T2) => UnwrapOr<T2> = default_ => r =>
  r.ok === true ? r.val : default_;

export const unwrapElse: <E, T2>(op: Oper<E, T2>) => UnwrapElse<E, T2> =
  op => r =>
    r.ok === true ? r.val : op(r.err);

export const unwrapErrOr: <E2>(default_: E2) => UnwrapErrOr<E2> =
  default_ => r =>
    r.ok === true ? default_ : r.err;
export const unwrapErrElse: <T, E2>(op: Oper<T, E2>) => UnwrapErrElse<T, E2> =
  op => r =>
    r.ok === true ? op(r.val) : r.err;

export const dump: <T, E>(r: Result<T, E>) => T | E = r =>
  r.ok === true ? r.val : r.err;
