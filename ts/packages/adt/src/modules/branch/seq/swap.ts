import { swap as swapCore } from "@branch:core/swap";
import type { Branch } from "@branch:core/types";

export const swap: <L, R>(branch: Branch<L, R>) => Branch<R, L> = swapCore;
