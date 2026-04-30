import type { Oper, OperA } from "#utility/types/oper.js";
import { _Err, _Ok } from "./construct.internal.js";

export type Ok<out T> = {
  readonly ok: true;
  readonly val: T;
};

export type Err<out E> = {
  readonly ok: false;
  readonly err: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export type ResultBase = Result<unknown, unknown>;

export type InferOk<R extends ResultBase> = R extends Ok<infer T> ? T : never;
export type InferErr<R extends ResultBase> = R extends Err<infer E> ? E : never;

export type NormalizeResult<R extends ResultBase> = Result<
  InferOk<R>,
  InferErr<R>
>;

export type InferOks<T extends readonly ResultBase[]> = {
  -readonly [K in keyof T]: InferOk<T[K]>;
};

export type InferErrs<T extends readonly ResultBase[]> = {
  -readonly [K in keyof T]: InferErr<T[K]>;
};

export type OperResult_O<in In, out T, out E> = Oper<In, Result<T, E>>;
export type OperResult_I<in T, in E, out Out> = Oper<Result<T, E>, Out>;
export type OperResult_IO<in T1, in E1, out T2, out E2> = Oper<
  Result<T1, E1>,
  Result<T2, E2>
>;
export type OperAResult_O<in In, out T, out E> = OperA<In, Result<T, E>>;
export type OperAResult_IO<in T1, in E1, out T2, out E2> = OperA<
  Result<T1, E1>,
  Result<T2, E2>
>;

export const ok = <T>(val: T): Ok<T> => new _Ok(val);

export const err = <E>(err: E): Err<E> => new _Err(err);

export const isOk = <T, E>(input: Result<T, E>): input is Ok<T> =>
  input.ok === true;
export const isErr = <T, E>(input: Result<T, E>): input is Err<E> =>
  input.ok === false;
