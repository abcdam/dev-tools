import { left, right } from "@branch/core/primitives";
import type { Branch } from "@branch/core/types";

export const mapLeft = <L, R, L2>(
  branch: Branch<L, R>,
  mapFn: (leftValue: L) => L2,
): Branch<L2, R> =>
  branch.branch === "left" ? left(mapFn(branch.value)) : branch;

export const mapRight = <L, R, R2>(
  branch: Branch<L, R>,
  mapFn: (rightValue: R) => R2,
): Branch<L, R2> =>
  branch.branch === "right" ? right(mapFn(branch.value)) : branch;

export const bimap = <L, R, L2, R2>(
  branch: Branch<L, R>,
  leftFn: (leftValue: L) => L2,
  rightFn: (rightValue: R) => R2,
): Branch<L2, R2> =>
  branch.branch === "left"
    ? left(leftFn(branch.value))
    : right(rightFn(branch.value));
