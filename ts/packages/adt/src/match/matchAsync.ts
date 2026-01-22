import type { Awaitable } from "@internal/types";
import type { Result } from "@result/types";
import { matcher } from "./match";
import type { Handlers, MatcherAsyncFn } from "./types";

export const matchAsync = async <T, E, RO, RE>(
  result: Awaitable<Result<T, E>>,
  handle: Handlers<T, E, RO, RE>,
): Promise<RO | RE> => Promise.resolve(result).then(matcher(handle));

export const matcherAsync =
  <T, E, RO, RE>(
    handle: Handlers<T, E, RO, RE>,
  ): MatcherAsyncFn<T, E, RO | RE> =>
  (value) =>
    matchAsync(value, handle);
