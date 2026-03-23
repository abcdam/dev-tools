import type { Result } from "../../primitive.js";

export const unwrapOr =
  <T2>(fallback: T2) =>
  <T1, E>(result: Result<T1, E>): T1 | T2 =>
    result.ok === true ? result.value : fallback;

export const unwrapElse =
  <T2, E>(fallback: (errValue: E) => T2) =>
  <T1>(result: Result<T1, E>): T1 | T2 =>
    result.ok === true ? result.value : fallback(result.error);

export const unwrapErrOr =
  <T2>(fallback: T2) =>
  <T1, E>(result: Result<T1, E>): E | T2 =>
    result.ok === true ? fallback : result.error;
export const unwrapErrElse =
  <T2>(fallback: () => T2) =>
  <T1, E>(result: Result<T1, E>): E | T2 =>
    result.ok === true ? fallback() : result.error;
