import type { Branch } from "@branch:core/types";

export const match = <L, R, O>(
  branch: Branch<L, R>,
  leftFn: (leftValue: L) => O,
  rightFn: (rightValue: R) => O,
): O =>
  branch.branch === "left" ? leftFn(branch.value) : rightFn(branch.value);
