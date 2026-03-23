import { type Option, some } from "../../primitive.js";

export const map = <T1, T2 = T1>(
  input: Option<T1>,
  mapFn: (someValue: T1) => T2,
): Option<T2> => (input.exists === true ? some(mapFn(input.value)) : input);
