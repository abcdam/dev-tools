import type { Option } from "#option/primitive.js";
import { err, ok, type Result } from "../../primitive.js";
export const takeSomeOr = <T, E>(option: Option<T>, error: E): Result<T, E> =>
  option.exists === true ? ok(option.val) : err(error);
export const takeSomeElse = <T, E>(
  option: Option<T>,
  errFn: () => E,
): Result<T, E> => (option.exists === true ? ok(option.val) : err(errFn()));
