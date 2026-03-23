import type { Option } from "../../primitive.js";
export const selectOr = <T, R0, R1>(
  option: Option<T>,
  someValue: R0,
  noneValue: R1,
): R0 | R1 => (option.exists === true ? someValue : noneValue);

export const selectElse = <T, R0, R1>(
  option: Option<T>,
  someValue: R0,
  noneValue: () => R1,
): R0 | R1 => (option.exists === true ? someValue : noneValue());
