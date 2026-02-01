import { err } from "@result:core/primitives";
import type { Result } from "@result:core/types";
import type { ErrDefined } from "./types.js";

export const mapErr =
  <E, F>(mapFn: (e: E) => F) =>
  <T>(input: Result<T, E> & ErrDefined<E>): Result<T, F> =>
    input.ok ? input : err(mapFn(input.error));

export const mapErrAsync =
  <E, F>(mapFn: (error: E) => F) =>
  async <T>(input: Result<T, E> & ErrDefined<E>): Promise<Result<T, F>> =>
    input.ok ? input : err(mapFn(input.error));
