import type { Option } from "../../primitive.js";

export const unwrapOr = <T, D = T>(opt: Option<T>, fallback: D): T | D =>
  opt.exists === true ? opt.val : fallback;

export const unwrapElse = <T, D = T>(
  opt: Option<T>,
  fallbackFn: () => D,
): T | D => (opt.exists === true ? opt.val : fallbackFn());
