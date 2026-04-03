import { _NONE } from "#option/const.js";
import {
  isNotFalsy,
  isNotNullish,
  type NeverFalsy,
  type NeverNullOrUndefined,
} from "#utility/guard.js";
import { type Option, some } from "../../primitive.js";
export const defined = <T>(input: T): Option<NeverNullOrUndefined<T>> =>
  isNotNullish(input) ? some(input) : _NONE;

export const truthy = <T>(input: T): Option<NeverFalsy<T>> =>
  isNotFalsy(input) ? some(input) : _NONE;
