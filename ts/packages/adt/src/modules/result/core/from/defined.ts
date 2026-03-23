import {
  isNotFalsy,
  isNotNullish,
  type NeverFalsy,
  type NeverNullOrUndefined,
} from "#utility/guard.js";
import { err, ok, type Result } from "../../primitive.js";

export const definedOr = <T, E>(
  input: T,
  errValue: E,
): Result<NeverNullOrUndefined<T>, E> =>
  isNotNullish(input) ? ok(input) : err(errValue);

export const definedElse = <T, E>(
  input: T,
  errFn: (value: T) => E,
): Result<NeverNullOrUndefined<T>, E> =>
  isNotNullish(input) ? ok(input) : err(errFn(input));

export const truthyOr = <T, E>(
  input: T,
  errValue: E,
): Result<NeverFalsy<T>, E> => (isNotFalsy(input) ? ok(input) : err(errValue));

export const truthyElse = <T, E>(
  input: T,
  errFn: (value: T) => E,
): Result<NeverFalsy<T>, E> =>
  isNotFalsy(input) ? ok(input) : err(errFn(input));
