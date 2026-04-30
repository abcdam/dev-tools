import type { Defined, Falsy, Truthy } from "#utility/types/guard.js";
import type { Oper, OperThunk } from "#utility/types/oper.js";
import { err, ok, type Result } from "../../primitive.js";

type UnlessDefined<out E> = <T>(input: T) => Result<Defined<T>, E>;
type UnlessTruthy<out E> = <T>(input: T) => Result<Truthy<T>, E>;
export const definedOr = <E>(err_: E): UnlessDefined<E> =>
  (input => (input != null ? ok(input) : err(err_))) as UnlessDefined<E>;

export const definedElse = <E>(thunk: OperThunk<E>): UnlessDefined<E> =>
  (input => (input != null ? ok(input) : err(thunk()))) as UnlessDefined<E>;

export const truthyOr = <E>(err_: E): UnlessTruthy<E> =>
  (input => (input ? ok(input) : err(err_))) as UnlessTruthy<E>;

export const truthyElse = <T, E>(errOp: Oper<Falsy<T>, E>): UnlessTruthy<E> =>
  (input =>
    input ? ok(input) : err(errOp(input as Falsy<T>))) as UnlessTruthy<E>;
