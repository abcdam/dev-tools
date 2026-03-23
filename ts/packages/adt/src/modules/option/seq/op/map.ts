import { type Option, some } from "../../primitive.js";

export const map =
  <T1, T2 = T1>(mapFn: (someValue: T1) => T2) =>
  (option: Option<T1>): Option<T2> =>
    option.exists === true ? some(mapFn(option.value)) : option;
