export type Ok<T> = {
  readonly ok: true;
  readonly value: T;
};

export type Err<E> = {
  readonly ok: false;
  readonly error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export type ResultAsync<T, E> = Promise<Result<T, E>>;

export type ResultAwaitable<T, E> = ResultAsync<T, E> | Result<T, E>;
