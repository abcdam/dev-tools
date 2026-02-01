import type { Branch } from "@branch/core/types";
import { match as matchCore } from "@branch:core/match";

export const match =
  <L, R, O>(leftFn: (leftValue: L) => O, rightFn: (rightValue: R) => O) =>
  (branch: Branch<L, R>): O =>
    matchCore(branch, leftFn, rightFn);
