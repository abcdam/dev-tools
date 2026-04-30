// type V = Promise<unknown>

import type { Oper } from "#utility/types/oper.js";

export type PromUnknown = Promise<unknown>;
export type OperUnknown = Oper<unknown, unknown>;
export type DeadCodeError<Reason extends string> = {
  "♻️ Useless call. Can be safely removed": Reason;
};

export type CheckExistence<T, FailMsg extends string> = [T] extends [never]
  ? DeadCodeError<FailMsg>
  : unknown;
export type OperAwaitable<in In, out Out> = Oper<
  Awaited<In>,
  Promise<Awaited<Out>> | Out
>;
