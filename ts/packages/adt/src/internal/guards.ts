import type { Result } from "@result:core/types";

export const isPromise = <T, E>(
  result: Promise<Result<T, E>> | Result<T, E>,
): result is Promise<Result<T, E>> =>
  // biome-ignore lint/suspicious/noExplicitAny: <use ducktyping to handle different Promise implementations>
  result instanceof Promise || typeof (result as any).then === "function";

export const isDefined = <T>(input: T): input is NonNullable<T> =>
  input !== null && input !== undefined;
