import type { Option } from "#option/primitive.js";
import { err, ok, type Result } from "../../primitive.js";

export const takeSomeOr =
  <E>(errValue: E) =>
  <T>(option: Option<T>): Result<T, E> =>
    option.exists === true ? ok(option.val) : err(errValue);
export const takeSomeElse =
  <E>(errFn: () => E) =>
  <T>(option: Option<T>): Result<T, E> =>
    option.exists === true ? ok(option.val) : err(errFn());
