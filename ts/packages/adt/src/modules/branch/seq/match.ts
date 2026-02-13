import { match as matchCore } from "@branch:core/match";
import type { Branch } from "@branch:core/types";

export const match =
  <L, R, O>(leftFn: (leftValue: L) => O, rightFn: (rightValue: R) => O) =>
  (branch: Branch<L, R>): O =>
    matchCore(branch, leftFn, rightFn);
