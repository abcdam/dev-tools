import type { Option } from "./types.js";
export const someOr = <T, D = T>(opt: Option<T>, fallback: D): T | D =>
  opt.exists ? opt.value : fallback;

export const someOrElse = <T, D = T>(
  opt: Option<T>,
  fallbackFn: () => D,
): T | D => (opt.exists ? opt.value : fallbackFn());
