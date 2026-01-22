import type { PolicyBranch } from "@internal/types";
import { some } from "@option/operators";
import type { CachePolicy } from "./types";

export const andPolicy = <T, E, M1, M2>(
  p1: CachePolicy<T, E, M1>,
  p2: CachePolicy<T, E, M2>,
): CachePolicy<T, E, [M1, M2]> => ({
  updateMetadata: (result) => {
    const m1 = p1.updateMetadata(result);
    if (!m1.some) return { some: false };

    const m2 = p2.updateMetadata(result);
    if (!m2.some) return { some: false };

    return some([m1.value, m2.value]);
  },

  isFresh: ([m1, m2]) => p1.isFresh(m1) && p2.isFresh(m2),
});

export const orPolicy = <T, E, M1, M2>(
  p1: CachePolicy<T, E, M1>,
  p2: CachePolicy<T, E, M2>,
): CachePolicy<T, E, PolicyBranch<M1, M2>> => ({
  updateMetadata: (result) => {
    const b1 = p1.updateMetadata(result);
    if (b1.some) return some({ branch: "left", value: b1.value });

    const b2 = p2.updateMetadata(result);
    if (b2.some) return some({ branch: "right", value: b2.value });

    return { some: false };
  },

  isFresh: (meta) =>
    meta.branch === "left" ? p1.isFresh(meta.value) : p2.isFresh(meta.value),
});
