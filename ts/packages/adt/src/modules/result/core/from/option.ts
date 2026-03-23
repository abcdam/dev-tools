import type { Option } from "#option/primitive.js";
import { err, ok, type Result } from "../../primitive.js";
export const fromOptionOr = <T, E>(
  option: Option<T>,
  error: E,
): Result<T, E> => (option.exists === true ? ok(option.value) : err(error));
export const fromOptionElse = <T, E>(
  option: Option<T>,
  errFn: () => E,
): Result<T, E> => (option.exists === true ? ok(option.value) : err(errFn()));
