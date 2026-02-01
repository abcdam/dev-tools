import type { Result } from "@result:core/types";

export type MatcherFn<T, E, R> = (result: Result<T, E>) => R;
