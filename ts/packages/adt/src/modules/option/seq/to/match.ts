import type { Oper, OperThunk } from "#utility/types/oper.js";
import type { Option } from "../../primitive.js";

type MatchOr<in T, out Out> = Oper<Option<T>, Out>;
export const matchOr: <T, R0, R1>(
  someOp: Oper<T, R0>,
  fallback: R1,
) => MatchOr<T, R0 | R1> = (mapFn, fb) => opt =>
  opt.exists === true ? mapFn(opt.val) : fb;

export const matchElse: <T, R0, R1>(
  someOp: Oper<T, R0>,
  noneOp: OperThunk<R1>,
) => MatchOr<T, R0 | R1> = (mapFn, fbFn) => opt =>
  opt.exists === true ? mapFn(opt.val) : fbFn();
