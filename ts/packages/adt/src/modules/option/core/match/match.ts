import type { Option } from "@option:core/types";

export const match = <T, R0, R1>(
  option: Option<T>,
  onSome: (value: T) => R0,
  onNone: () => R1,
): R0 | R1 => (option.exists ? onSome(option.value) : onNone());
