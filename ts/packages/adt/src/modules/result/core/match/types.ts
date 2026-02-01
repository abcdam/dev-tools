export interface MatchHandler<T, E, RO, RE = RO> {
  Ok: (value: T) => RO;
  Err: (error: E) => RE;
}

export interface MatchHandlerSafe<T, E, RO, RE = RO, RP = RO | RE>
  extends MatchHandler<T, E, RO, RE> {
  Panic: (cause: unknown) => RP;
}
