import { _NONE } from "#option/construct.internal.js";
import type { Defined, Truthy } from "#utility/types/guard.js";
import { type Option, some } from "../../primitive.js";
export const defined = <T>(input: T): Option<Defined<T>> =>
  input != null ? some(input as Defined<T>) : _NONE;

export const truthy = <T>(input: T): Option<Truthy<T>> =>
  input ? some(input as Truthy<T>) : _NONE;
