import type { Option } from "#option/primitive.js";
import { err, ok, type Result } from "../../primitive.js";

export const fromOptionOr =
  <E>(errValue: E) =>
  <T>(option: Option<T>): Result<T, E> =>
    option.exists === true ? ok(option.value) : err(errValue);
export const fromOptionElse =
  <E>(errFn: () => E) =>
  <T>(option: Option<T>): Result<T, E> =>
    option.exists === true ? ok(option.value) : err(errFn());
