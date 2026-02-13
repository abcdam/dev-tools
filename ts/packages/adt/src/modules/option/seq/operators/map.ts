import { map as mapCore } from "@option:core/operators/map";
import type { Option } from "@option:core/types";

export const map =
  <T1, T2 = T1>(mapFn: (someValue: T1) => T2) =>
  (opt: Option<T1>): Option<T2> =>
    mapCore(opt, mapFn);
