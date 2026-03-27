import { swap as swapCore } from "#branch/core/swap.js";
import type { Branch } from "#branch/primitives.js";

export const swap: <L, R>(branch: Branch<L, R>) => Branch<R, L> = swapCore;
