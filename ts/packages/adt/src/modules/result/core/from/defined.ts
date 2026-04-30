import type { Defined, Truthy } from "#utility/types/guard.js";
import { err, ok, type Result } from "../../primitive.js";

export const definedOr = <T, E>(
  input: T,
  errValue: E,
): Result<Defined<T>, E> =>
  input != null ? ok(input as Defined<T>) : err(errValue);

export const definedElse = <T, E>(
  input: T,
  errFn: (value: T) => E,
): Result<Defined<T>, E> =>
  input != null ? ok(input as Defined<T>) : err(errFn(input));

export const truthyOr = <T, E>(input: T, errValue: E): Result<Truthy<T>, E> =>
  input ? ok(input as Truthy<T>) : err(errValue);

export const truthyElse = <T, E>(
  input: T,
  errFn: (value: T) => E,
): Result<Truthy<T>, E> => (input ? ok(input as Truthy<T>) : err(errFn(input)));
