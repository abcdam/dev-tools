import { _NONE } from "#option/construct.internal.js";
import type { Result } from "#result/primitive.js";
import { type Option, some } from "../../primitive.js";

export const takeOk = <T, E>(result: Result<T, E>): Option<T> =>
  result.ok === true ? some(result.val) : _NONE;
