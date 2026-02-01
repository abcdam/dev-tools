import type { Left, Right } from "./types.js";

export const left = <L>(value: L): Left<L> => ({ branch: "left", value });
export const right = <R>(value: R): Right<R> => ({ branch: "right", value });
