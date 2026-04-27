import {
  type Defined,
  isNotNullish,
  isTruthy,
  type Truthy,
} from "#utility/guard/guard.js";
import { err, ok, type Result } from "../../primitive.js";

export const definedOr =
  <E>(errValue: E) =>
  <T>(input: T): Result<Defined<T>, E> =>
    isNotNullish(input) ? ok(input) : err(errValue);

export const definedElse =
  <E>(errorFn: () => E) =>
  <T>(input: T): Result<Defined<T>, E> =>
    isNotNullish(input) ? ok(input) : err(errorFn());

export const truthyOr =
  <E>(errValue: E) =>
  <T>(input: T): Result<Truthy<T>, E> =>
    isTruthy(input) ? ok(input) : err(errValue);

export const truthyElse =
  <T, E>(errorFn: (input: T) => E) =>
  (input: T): Result<Truthy<T>, E> =>
    isTruthy(input) ? ok(input) : err(errorFn(input));
