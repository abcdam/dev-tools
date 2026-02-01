import { fromTry } from "@result:core/from/fromTry";
import { fromTryAsync } from "@result:core/from/fromTryAsync";
import type { Result } from "@result:core/types";
import type { OkDefined } from "./types.js";

export const andThen =
  <T, U = never, E2 = never>(mapFn: (ok: T) => Result<U, E2>) =>
  <E>(result: Result<T, E> & OkDefined<T>): Result<U, E | E2> =>
    result.ok ? mapFn(result.value) : result;

export const andThenAsync =
  <T, U = never, E2 = never>(mapFn: (ok: T) => Promise<Result<U, E2>>) =>
  <E>(result: Result<T, E> & OkDefined<T>): Promise<Result<U, E | E2>> =>
    result.ok
      ? mapFn(result.value)
      : (result as unknown as Promise<Result<U, E | E2>>);

export const andThenTry =
  <T, U, E2>(fn: (val: T) => U, onError: (u: unknown) => E2) =>
  <E>(input: Result<T, E>): Result<U, E | E2> =>
    input.ok ? fromTry(() => fn(input.value), onError) : input;

export const andThenTryAsync =
  <T, U, E2>(fn: (val: T) => Promise<U>, onError: (u: unknown) => E2) =>
  <E>(input: Result<T, E>): Promise<Result<U, E | E2>> =>
    input.ok
      ? fromTryAsync(() => fn(input.value), onError)
      : (input as unknown as Promise<Result<U, E | E2>>);
/*
export const andThenAsync =
  <T, U, E2>(mapFn: (ok: T) => Promise<Result<U, E2>>) =>
  <E>(result: Result<T, E> & OkDefined<T>): Promise<Result<U, E | E2>> =>
    result.ok
      ? mapFn(result.value)
      : // Don't know yet how to trick tsc to make inference work reliably
        // at call-site for a mixed union of Promise/Sync error types. this here
        // is safe because the promise type is unwrapped again in the pipeline.
        (result as unknown as Promise<Result<U, E | E2>>);

*/
