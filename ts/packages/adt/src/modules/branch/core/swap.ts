import { left, right } from "@branch:core/primitives";
import type { Branch } from "@branch:core/types";

export const swap = <L, R>(branch: Branch<L, R>): Branch<R, L> =>
  branch.branch === "left" ? right(branch.value) : left(branch.value);
