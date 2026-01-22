import type { Result } from "@result/types";
import { match } from "./match";
import type { MatcherFn, PanickyHandlers } from "./types";

export const matchSafe = <T, E, RO, RE, RP>(
  result: Result<T, E>,
  handle: PanickyHandlers<T, E, RO, RE, RP>,
): RO | RE | RP => {
  try {
    return match(result, handle);
  } catch (cause) {
    return handle.Panic(cause);
  }
};

export const matcherSafe =
  <T, E, RO, RE, RP>(
    handle: PanickyHandlers<T, E, RO, RE, RP>,
  ): MatcherFn<T, E, RO | RE | RP> =>
  (value) =>
    matchSafe(value, handle);
