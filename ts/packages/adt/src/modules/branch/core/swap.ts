import { type Branch, left, right } from "#branch/primitives.js";

export const swap = <L, R>(branch: Branch<L, R>): Branch<R, L> =>
  branch.branch === "left" ? right(branch.value) : left(branch.value);
