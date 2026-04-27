import type { Option } from "../../primitive.js";

export const selectOr: <R0, R1>(
  onSome: R0,
  onNone: R1,
) => <T>(o: Option<T>) => R0 | R1 = (sv, nv) => opt =>
  opt.exists === true ? sv : nv;

export const selectElse: <R0, R1>(
  onSome: R0,
  onNoneFn: () => R1,
) => <T>(o: Option<T>) => R0 | R1 = (sv, nvFn) => opt =>
  opt.exists === true ? sv : nvFn();
