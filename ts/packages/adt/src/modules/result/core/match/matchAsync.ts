import type { Result } from "@result:core/types";
import { match } from "./match.js";
import type { MatchHandler, MatchHandlerSafe } from "./types.js";

export const matchAsync = async <T, E, RO, RE>(
  result: Promise<Result<T, E>>,
  handle: MatchHandler<T, E, RO, RE>,
): Promise<RO | RE> => {
  const value = await result;
  return match(value, handle);
};
export const matchAsyncSafe = async <T, E, RO, RE, RP>(
  result: Promise<Result<T, E>>,
  handle: MatchHandlerSafe<T, E, RO, RE, RP>,
): Promise<RO | RE | RP> => {
  try {
    const value = await matchAsync(result, handle);
    return value;
  } catch (cause) {
    return handle.Panic(cause);
  }
};
