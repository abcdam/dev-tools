import type { OperThunk } from "#compose/index.js";
import type { Option } from "../../primitive.js";

type Select<out Out> = <T>(o: Option<T>) => Out;
export const selectOr: <R0, R1>(
  replaceSome: R0,
  replaceNone: R1,
) => Select<R0 | R1> = (sv, nv) => opt => (opt.exists === true ? sv : nv);

export const selectElse: <R0, R1>(
  replaceSome: R0,
  noneOp: OperThunk<R1>,
) => Select<R0 | R1> = (sv, nvFn) => opt => (opt.exists === true ? sv : nvFn());
