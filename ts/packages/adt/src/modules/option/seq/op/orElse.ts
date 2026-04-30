import type { OperAThunk, OperThunk } from "#compose/index.js";
import type { Option } from "../../primitive.js";

type Else<out T2> = <T1>(o: Option<T1>) => Option<T1 | T2>;
type ElseAsync<out T2> = <T1>(o: Option<T1>) => Promise<Option<T1 | T2>>;
export const orElse: <T2>(thunk: OperThunk<Option<T2>>) => Else<T2> =
  recFn => opt =>
    opt.exists === true ? opt : recFn();

export const orElseAsync: <T2>(
  thunkA: OperAThunk<Option<T2>>,
) => ElseAsync<T2> = recFn => opt =>
  opt.exists === true ? Promise.resolve(opt) : recFn();
