import type { OperThunk } from "#compose/index.js";
import type { Option } from "#option/primitive.js";
import { err, ok, type Result } from "../../primitive.js";

type TakeSome<out E> = <T>(option: Option<T>) => Result<T, E>;
export const takeSomeOr =
  <E>(err_: E): TakeSome<E> =>
  o =>
    o.exists === true ? ok(o.val) : err(err_);
export const takeSomeElse =
  <E>(thunk: OperThunk<E>): TakeSome<E> =>
  o =>
    o.exists === true ? ok(o.val) : err(thunk());
