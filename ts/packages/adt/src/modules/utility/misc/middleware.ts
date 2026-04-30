import type { Oper } from "#utility/types/oper.js";

export type Middleware<TInput, TCtxt, TSinkIn> = Oper<
  TInput,
  Oper<TCtxt, TSinkIn> | undefined
>;
