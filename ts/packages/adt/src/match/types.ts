import type { Result, ResultAwaitable } from "@result/types";

export interface Handlers<T, E, RO, RE = RO> {
  Ok: (value: T) => RO;
  Err: (error: E) => RE;
}

export interface PanickyHandlers<T, E, RO, RE = RO, RP = RO | RE>
  extends Handlers<T, E, RO, RE> {
  Panic: (cause: unknown) => RP;
}

export type MatcherFn<T, E, R> = (value: Result<T, E>) => R;
export type MatcherAsyncFn<T, E, R> = (
  value: ResultAwaitable<T, E>,
) => Promise<R>;
