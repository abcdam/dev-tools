import { some } from "@option:core/primitives";
import type { Option } from "@option:core/types";

export const map = <T1, T2 = T1>(
  input: Option<T1>,
  mapFn: (someValue: T1) => T2,
): Option<T2> => (input.exists ? some(mapFn(input.value)) : input);
