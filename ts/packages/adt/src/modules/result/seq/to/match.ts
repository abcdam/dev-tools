import type { Oper } from "#utility/types/oper.js";
import type { Result } from "../../primitive.js";

type MatchOr<in T, out Out> = <E>(r: Result<T, E>) => Out;
type MatchElse<in T, in E, out Out> = Oper<Result<T, E>, Out>;
export const matchOr =
  <T, RO, RE>(okOp: Oper<T, RO>, default_: RE): MatchOr<T, RO | RE> =>
  r =>
    r.ok === true ? okOp(r.val) : default_;
export const matchElse =
  <T, E, RO, RE>(
    okOp: Oper<T, RO>,
    errOp: Oper<E, RE>,
  ): MatchElse<T, E, RO | RE> =>
  r =>
    r.ok === true ? okOp(r.val) : errOp(r.err);
