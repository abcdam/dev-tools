import type { Oper } from "#compose/types.js";
import type { Option } from "../../primitive.js";

export const matchOr: <T, R0, R1>(
  mapFn: Oper<T, R0>,
  fallback: R1,
) => Oper<Option<T>, R0 | R1> = (mapFn, fb) => opt =>
  opt.exists === true ? mapFn(opt.val) : fb;

export const matchElse: <T, R0, R1>(
  mapFn: Oper<T, R0>,
  fallbackFn: () => R1,
) => Oper<Option<T>, R0 | R1> = (mapFn, fbFn) => opt =>
  opt.exists === true ? mapFn(opt.val) : fbFn();
