import { _NONE } from "#option/const.js";
import {
  isNotFalsy,
  isNotNullish,
  type NotFalsy,
  type NotNullOrUndefined,
} from "#utility/guard.js";
import { type Option, some } from "../../primitive.js";
export const defined = <T>(input: T): Option<NotNullOrUndefined<T>> =>
  isNotNullish(input) ? some(input) : _NONE;

export const truthy = <T>(input: T): Option<NotFalsy<T>> =>
  isNotFalsy(input) ? some(input) : _NONE;
