import { err, ok } from "@result:core/primitives";
import type { Result } from "@result:core/types";
import type { ErrDefined, OkDefined } from "./types.js";

export const map =
  <T1, T2>(mapFn: (okValue: T1) => T2) =>
  <E>(result: Result<T1, E> & OkDefined<T1>): Result<T2, E> =>
    result.ok ? ok(mapFn(result.value)) : result;

export const mapErr =
  <E1, E2 = E1>(mapFn: (errValue: E1) => E2) =>
  <T1>(result: Result<T1, E1> & ErrDefined<E1>): Result<T1, E2> =>
    result.ok ? result : err(mapFn(result.error));
