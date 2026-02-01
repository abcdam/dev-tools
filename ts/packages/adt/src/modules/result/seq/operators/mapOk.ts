import { ok } from "@result:core/primitives";
import type { Result } from "@result:core/types";
import type { OkDefined } from "./types.js";

export const map =
  <T, U>(mapFn: (okValue: T) => U) =>
  <E>(input: Result<T, E> & OkDefined<T>): Result<U, E> =>
    input.ok ? ok(mapFn(input.value)) : input;

export const mapAsync =
  <T, U>(mapFn: (okValue: T) => U) =>
  async <E>(input: Result<T, E> & OkDefined<T>): Promise<Result<U, E>> =>
    input.ok ? ok(mapFn(input.value)) : input;
