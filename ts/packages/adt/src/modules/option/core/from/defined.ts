import {
  isNotFalsy,
  isNotNullish,
  type NeverFalsy,
  type NeverNullOrUndefined,
} from "#utility/guard.js";
import { none, type Option, some } from "../../primitive.js";
export const defined = <T>(input: T): Option<NeverNullOrUndefined<T>> =>
  isNotNullish(input) ? some(input) : none();

export const truthy = <T>(input: T): Option<NeverFalsy<T>> =>
  isNotFalsy(input) ? some(input) : none();
