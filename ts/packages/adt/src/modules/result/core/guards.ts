import type { Err, Ok, Result } from "./types.js";

export const isOk = <T, E>(input: Result<T, E>): input is Ok<T> => input.ok;
export const isErr = <T, E>(input: Result<T, E>): input is Err<E> => !input.ok;
