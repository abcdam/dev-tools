/** biome-ignore-all lint/suspicious/noExplicitAny: <align with unresolved generic> */
import type { OperThunk } from "#utility/types/oper.js";
import type { Option } from "../../primitive.js";

// Beautify: Collapse locked D into T if fallback is a subtype. Tsc is lazy and needs a poke (T[] | [] => T[])
type Normalized<T, V> = T | (V extends T ? never : V);

type Unwrap<out V> = <T>(o: Option<T>) => Normalized<T, V>;
export const unwrapOr: <V>(default_: V) => Unwrap<V> = default_ => opt =>
  opt.exists === true ? opt.val : (default_ as any);

export const unwrapElse: <V>(thunk: OperThunk<V>) => Unwrap<V> = thunk => opt =>
  opt.exists === true ? opt.val : (thunk() as any);
