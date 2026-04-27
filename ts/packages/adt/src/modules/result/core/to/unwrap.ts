import type { Result } from "../../primitive.js";

export const unwrapOr = <T1, T2, E>(
  result: Result<T1, E>,
  fallback: T2,
): T1 | T2 => (result.ok === true ? result.val : fallback);

export const unwrapElse = <T1, T2, E>(
  result: Result<T1, E>,
  fallback: (errValue: E) => T2,
): T1 | T2 => (result.ok === true ? result.val : fallback(result.err));

export const unwrapErrOr = <T1, T2, E>(
  result: Result<T1, E>,
  fallback: T2,
): E | T2 => (result.ok === true ? fallback : result.err);
export const unwrapErrElse = <T1, T2, E>(
  result: Result<T1, E>,
  fallback: () => T2,
): E | T2 => (result.ok === true ? fallback() : result.err);
