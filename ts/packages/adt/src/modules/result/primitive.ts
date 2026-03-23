export type Ok<out T> = {
  readonly ok: true;
  readonly value: T;
};

export type Err<out E> = {
  readonly ok: false;
  readonly error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });

export const err = <E>(error: E): Err<E> => ({ ok: false, error });

export const isOk = <T, E>(input: Result<T, E>): input is Ok<T> =>
  input.ok === true;
export const isErr = <T, E>(input: Result<T, E>): input is Err<E> =>
  input.ok === false;
