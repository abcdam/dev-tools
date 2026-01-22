import type { Awaitable } from "@internal/types";
import type { Result } from "@result/types";
import { matchAsync } from "./matchAsync";
import type { MatcherAsyncFn, PanickyHandlers } from "./types";

export const matchAsyncSafe = async <T, E, RO, RE, RP>(
  result: Awaitable<Result<T, E>>,
  handle: PanickyHandlers<T, E, RO, RE, RP>,
): Promise<RO | RE | RP> =>
  matchAsync(result, handle).catch((cause) => handle.Panic(cause));

export const matcherAsyncSafe =
  <T, E, RO, RE, RP>(
    handle: PanickyHandlers<T, E, RO, RE, RP>,
  ): MatcherAsyncFn<T, E, RO | RE | RP> =>
  (value) =>
    matchAsyncSafe(value, handle);
