import type { Option } from "../../primitive.js";

export const matchOr =
  <T, R0, R1>(onSome: (someValue: T) => R0, noneValue: R1) =>
  (option: Option<T>): R0 | R1 =>
    option.exists === true ? onSome(option.value) : noneValue;

export const matchElse =
  <T, R0, R1>(onSome: (someValue: T) => R0, onNone: () => R1) =>
  (option: Option<T>): R0 | R1 =>
    option.exists === true ? onSome(option.value) : onNone();
