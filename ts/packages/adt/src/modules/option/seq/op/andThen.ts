import { _NONE } from "#option/construct.internal.js";
import type { Oper, OperA } from "#utility/types/oper.js";
import type { OperAOption_IO, Option } from "../../primitive.js";
import type { MapSome } from "./types.internal.js";

type ThenAsync<in T1, out T2> = OperAOption_IO<T1, T2>;
type Then<in T1, out T2> = MapSome<T1, T2>;
export const andThen: <T1, T2 = T1>(op: Oper<T1, Option<T2>>) => Then<T1, T2> =
  op => o =>
    o.exists === true ? op(o.val) : _NONE;

// TODO ADAPT
export const andThenAsync: <T1, T2 = T1>(
  op: OperA<T1, Option<T2>>,
) => ThenAsync<T1, T2> = op => o =>
  o.exists === true ? op(o.val) : Promise.resolve(_NONE);
