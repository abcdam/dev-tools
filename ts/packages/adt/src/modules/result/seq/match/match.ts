import { match as matchCore } from "@result:core/match/match";
import type { MatcherFn } from "./types.js";

export const match =
  <T, E, RO, RE = RO>(
    Ok: (okInner: T) => RO,
    Err: (errInner: E) => RE,
  ): MatcherFn<T, E, RO | RE> =>
  (result) =>
    matchCore(result, { Ok, Err });
