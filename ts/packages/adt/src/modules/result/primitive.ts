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

export type BaseResult = Result<unknown, unknown>;

export type InferOk<R extends BaseResult> = R extends Ok<infer T> ? T : never;
export type InferErr<R extends BaseResult> = R extends Err<infer E> ? E : never;

export type NormalizeResult<R extends BaseResult> = Result<
  InferOk<R>,
  InferErr<R>
>;

export type InferOks<T extends readonly BaseResult[]> = {
  -readonly [K in keyof T]: InferOk<T[K]>;
};

export type InferErrs<T extends readonly BaseResult[]> = {
  -readonly [K in keyof T]: InferErr<T[K]>;
};

export const ok = <T>(val: T): Ok<T> => new _Ok(val);

export const err = <E>(err: E): Err<E> => new _Err(err);

export const isOk = <T, E>(input: Result<T, E>): input is Ok<T> =>
  input.ok === true;
export const isErr = <T, E>(input: Result<T, E>): input is Err<E> =>
  input.ok === false;
