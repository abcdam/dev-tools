import type { Result } from "@result:core/types";
import type { ErrDefined } from "./types.js";

export const orElse =
  <E, U, E2>(recoverFn: (error: E) => Result<U, E2>) =>
  <T>(input: Result<T, E> & ErrDefined<E>): Result<T | U, E2> =>
    input.ok ? input : recoverFn(input.error);

export const orElseAsync =
  <E, U, E2>(recoverFn: (error: E) => Promise<Result<U, E2>>) =>
  <T>(input: Result<T, E> & ErrDefined<E>): Promise<Result<U | T, E2>> =>
    input.ok
      ? (input as unknown as Promise<Result<T, E2>>)
      : recoverFn(input.error);

/*
     * export const orElseAsync =
  <const E, U, E2>(recoverFn: (error: E) => Promise<Result<U, E2>>) =>
  <T>(input: Result<T, E> & ErrDefined<E>): Promise<Result<U | T, E2>> =>
    input.ok
      ? // Don't know yet how to trick tsc to make inference work reliably
        // at call-site for a union of mixed Promise & Sync success types without breaking pipeline inference. this here
        // is safe because the promise type is unwrapped again in the pipeline.
        (input as unknown as Promise<Result<U | T, E2>>)
      : recoverFn(input.error);

     */
