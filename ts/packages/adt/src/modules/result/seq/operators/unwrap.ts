import type { Result } from "@result:core/types";

export const okOr =
  <T2>(fallback: T2) =>
  <T1, E>(result: Result<T1, E>): T1 | T2 =>
    result.ok ? result.value : fallback;

export const okOrElse =
  <T2, E>(fallback: (errValue: E) => T2) =>
  <T1>(result: Result<T1, E>): T1 | T2 =>
    result.ok ? result.value : fallback(result.error);

export const errOr =
  <T2>(fallback: T2) =>
  <T1, E>(result: Result<T1, E>): E | T2 =>
    result.ok ? fallback : result.error;
export const errOrElse =
  <T2>(fallback: () => T2) =>
  <T1, E>(result: Result<T1, E>): E | T2 =>
    result.ok ? fallback() : result.error;
