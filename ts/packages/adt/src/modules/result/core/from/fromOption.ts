import type { Option } from "@option:core/types";
import { err, ok } from "@result:core/primitives";
import type { Result } from "@result:core/types";

export const fromOptOr = <T, E>(option: Option<T>, error: E): Result<T, E> =>
  option.exists ? ok(option.value) : err(error);
export const fromOptOrElse = <T, E>(
  option: Option<T>,
  errFn: () => E,
): Result<T, E> => (option.exists ? ok(option.value) : err(errFn()));
