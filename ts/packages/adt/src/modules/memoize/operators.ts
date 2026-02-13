import { match } from "@branch:core/match";
import { left, right } from "@branch:core/primitives";
import type { Branch } from "@branch:core/types";
import { none, some } from "@option:core/primitives";
import type { CachePolicy } from "./types.js";

export const andPolicy = <T, E, M1, M2>(
  p1: CachePolicy<T, E, M1>,
  p2: CachePolicy<T, E, M2>,
): CachePolicy<T, E, [M1, M2]> => ({
  updateMetadata: (result) => {
    const m1 = p1.updateMetadata(result);
    if (!m1.exists) return none();

    const m2 = p2.updateMetadata(result);
    if (!m2.exists) return none();

    return some([m1.value, m2.value]);
  },

  isFresh: ([m1, m2]) => p1.isFresh(m1) && p2.isFresh(m2),
});

export const orPolicy = <T, E, M1, M2>(
  p1: CachePolicy<T, E, M1>,
  p2: CachePolicy<T, E, M2>,
): CachePolicy<T, E, Branch<M1, M2>> => ({
  updateMetadata: (result) => {
    const b1 = p1.updateMetadata(result);
    if (b1.exists) return some(left(b1.value));

    const b2 = p2.updateMetadata(result);
    if (b2.exists) return some(right(b2.value));

    return none();
  },

  isFresh: (meta) => match(meta, p1.isFresh, p2.isFresh),
});
