import type { Result } from "@result/types";
import type { Handlers, MatcherFn } from "./types";

export const match = <T, E, RO, RE>(
  result: Result<T, E>,
  handle: Handlers<T, E, RO, RE>,
): RO | RE => (result.ok ? handle.Ok(result.value) : handle.Err(result.error));
export const matcher =
  <T, E, RO, RE>(handle: Handlers<T, E, RO, RE>): MatcherFn<T, E, RO | RE> =>
  (value) =>
    match(value, handle);
