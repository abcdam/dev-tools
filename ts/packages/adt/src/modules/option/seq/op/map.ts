import { _NONE } from "#option/construct.internal.js";
import { type Option, some } from "../../primitive.js";

export const map: <T1, T2 = T1>(
  mapFn: (inner: T1) => T2,
) => (o: Option<T1>) => Option<T2> = mapFn => opt =>
  opt.exists === true ? some(mapFn(opt.val)) : _NONE;
