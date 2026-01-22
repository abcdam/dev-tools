import type { Awaitable } from "@internal/types";
import type { Result } from "@result/types";

export interface Handlers<T, E, RO, RE = RO> {
  Ok: (value: T) => RO;
  Err: (error: E) => RE;
}

export interface PanickyHandlers<T, E, RO, RE = RO, RP = RO | RE>
  extends Handlers<T, E, RO, RE> {
  Panic: (cause: unknown) => RP;
}

export type MatcherFn<T, E, R> = (result: Result<T, E>) => R;
export type MatcherAsyncFn<T, E, R> = (
  result: Awaitable<Result<T, E>>,
) => Promise<R>;
