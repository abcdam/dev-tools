import { err, ok, type Result } from "../../primitive.js";
import type { ErrNotNever, OkNotNever } from "../../result.internal.js";

export const map = <T1, T2, E>(
  result: Result<T1, E> & OkNotNever<T1>,
  mapFn: (okValue: T1) => T2,
): Result<T2, E> => (result.ok === true ? ok(mapFn(result.val)) : result);

export const mapErr = <T1, E1, E2 = E1>(
  result: Result<T1, E1> & ErrNotNever<E1>,
  mapFn: (errValue: E1) => E2,
): Result<T1, E2> => (result.ok === true ? result : err(mapFn(result.err)));
