import type { Result } from "#result/primitive.js";

export interface MatchHandler<T, E, RO, RE = RO> {
  Ok: (value: T) => RO;
  Err: (error: E) => RE;
}

export interface MatchHandlerSafe<T, E, RO, RE = RO, RP = RO | RE>
  extends MatchHandler<T, E, RO, RE> {
  Panic: (cause: unknown) => RP;
}

export const match = <T, E, RO, RE>(
  result: Result<T, E>,
  handle: MatchHandler<T, E, RO, RE>,
): RO | RE =>
  result.ok === true ? handle.Ok(result.val) : handle.Err(result.err);

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
