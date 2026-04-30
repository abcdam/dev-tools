import type { Option } from "#option/primitive.js";
import type { Oper } from "#utility/types/oper.js";

export type MapSome<in T, out U> = Oper<Option<T>, Option<U>>;
