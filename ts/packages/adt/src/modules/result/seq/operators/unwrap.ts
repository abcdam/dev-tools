import type { Result } from "@result:core/types";

export const okOr =
  <U>(fallback: U) =>
  <T, E>(result: Result<T, E>): T | U =>
    result.ok ? result.value : fallback;

export const okOrElse =
  <U>(fallback: () => U) =>
  <T, E>(result: Result<T, E>): T | U =>
    result.ok ? result.value : fallback();

export const errOr =
  <U>(fallback: U) =>
  <T, E>(result: Result<T, E>): E | U =>
    result.ok ? fallback : result.error;
export const errOrElse =
  <U>(fallback: () => U) =>
  <T, E>(result: Result<T, E>): E | U =>
    result.ok ? fallback() : result.error;
