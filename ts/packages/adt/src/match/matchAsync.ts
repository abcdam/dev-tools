import type { ResultAwaitable } from "@result/types";
import { matcher } from "./match";
import type { Handlers, MatcherAsyncFn } from "./types";

export const matchAsync = async <T, E, RO, RE>(
  result: ResultAwaitable<T, E>,
  handle: Handlers<T, E, RO, RE>,
): Promise<RO | RE> => Promise.resolve(result).then(matcher(handle));

export const matcherAsync =
  <T, E, RO, RE>(
    handle: Handlers<T, E, RO, RE>,
  ): MatcherAsyncFn<T, E, RO | RE> =>
  (value) =>
    matchAsync(value, handle);
