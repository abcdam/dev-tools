import type { Result } from "@result/types";
import type { Awaitable } from "./types";

export const isPromise = <T, E>(
  result: Awaitable<Result<T, E>>,
): result is Promise<Result<T, E>> =>
  // biome-ignore lint/suspicious/noExplicitAny: <use ducktyping to handle different Promise implementations>
  result instanceof Promise || typeof (result as any).then === "function";
