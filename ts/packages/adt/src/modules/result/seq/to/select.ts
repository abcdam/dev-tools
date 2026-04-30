import type { Oper } from "#utility/types/oper.js";
import type { Result } from "../../primitive.js";

type SelectOr<out Out> = <T, E>(r: Result<T, E>) => Out;
type SelectElse<in E, out Out> = <T>(r: Result<T, E>) => Out;
export const selectOr =
  <RO, RE>(replaceOk: RO, replaceErr: RE): SelectOr<RO | RE> =>
  r =>
    r.ok === true ? replaceOk : replaceErr;
export const selectElse =
  <E, RO, RE>(replaceOk: RO, errOp: Oper<E, RE>): SelectElse<E, RO | RE> =>
  r =>
    r.ok === true ? replaceOk : errOp(r.err);
