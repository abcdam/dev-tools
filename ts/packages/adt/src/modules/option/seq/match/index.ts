import { match as matchCore } from "@option:core/match/match";
import type { Option } from "@option:core/types";
export const match =
  <T, R0, R1>(
    onSome: (someValue: T) => R0,
    onNone: () => R1,
  ): ((option: Option<T>) => R0 | R1) =>
  (option) =>
    matchCore(option, onSome, onNone);
