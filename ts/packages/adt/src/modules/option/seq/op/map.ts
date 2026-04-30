import { _NONE } from "#option/construct.internal.js";
import type { Oper } from "#utility/types/oper.js";
import { some } from "../../primitive.js";
import type { MapSome } from "./types.internal.js";

export const map: <T1, T2 = T1>(op: Oper<T1, T2>) => MapSome<T1, T2> =
  op => opt =>
    opt.exists === true ? some(op(opt.val)) : _NONE;
