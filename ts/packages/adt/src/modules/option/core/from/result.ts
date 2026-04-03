import { _NONE } from "#option/const.js";
import type { Result } from "#result/primitive.js";
import { type Option, some } from "../../primitive.js";

export const fromResult = <T, E>(result: Result<T, E>): Option<T> =>
  result.ok === true ? some(result.value) : _NONE;
