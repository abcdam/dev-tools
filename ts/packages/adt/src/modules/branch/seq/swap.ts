import type { Branch } from "@branch/core/types";
import { swap as swapCore } from "@branch:core/swap";

export const swap: <L, R>(branch: Branch<L, R>) => Branch<R, L> = swapCore;
