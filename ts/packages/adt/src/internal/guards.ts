import type { Result } from "@result/types";
import type { Awaitable } from "./types";

export const isPromise = <T, E>(
  value: Awaitable<Result<T, E>>,
): value is Promise<Result<T, E>> =>
  // biome-ignore lint/suspicious/noExplicitAny: <use ducktyping to handle different Promise implementations>
  !!value && typeof (value as any).then === "function";
