import type { Option } from "../../primitive.js";
export const selectOr =
  <R0, R1>(someValue: R0, noneValue: R1) =>
  <T>(option: Option<T>): R0 | R1 =>
    option.exists === true ? someValue : noneValue;

export const selectElse =
  <R0, R1>(someValue: R0, noneValue: () => R1) =>
  <T>(option: Option<T>): R0 | R1 =>
    option.exists === true ? someValue : noneValue();
