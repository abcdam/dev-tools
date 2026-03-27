import { match as matchCore } from "#branch/core/match.js";
import type { Branch } from "#branch/primitives.js";

export const match =
  <L, R, O>(leftFn: (leftValue: L) => O, rightFn: (rightValue: R) => O) =>
  (branch: Branch<L, R>): O =>
    matchCore(branch, leftFn, rightFn);
