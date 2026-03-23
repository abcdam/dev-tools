import type { Result } from "#result/primitive.js";
import { none, type Option, some } from "../../primitive.js";

export const fromResult = <T, E>(result: Result<T, E>): Option<T> =>
  result.ok === true ? some(result.value) : none();
