import type { Result } from "@result:core/types";
import type { MatchHandler, MatchHandlerSafe } from "./types.js";

export const match = <T, E, RO, RE>(
  result: Result<T, E>,
  handle: MatchHandler<T, E, RO, RE>,
): RO | RE => (result.ok ? handle.Ok(result.value) : handle.Err(result.error));

export const matchSafe = <T, E, RO, RE, RP>(
  result: Result<T, E>,
  handle: MatchHandlerSafe<T, E, RO, RE, RP>,
): RO | RE | RP => {
  try {
    const value = match(result, handle);
    return value;
  } catch (cause) {
    return handle.Panic(cause);
  }
};
