import type { NullOrUndefined } from "./types.js";

export const isPromiseLike = <T>(
  result: T | PromiseLike<T>,
): result is PromiseLike<T> =>
  // biome-ignore lint/suspicious/noExplicitAny: <use ducktyping to handle different Promise implementations>
  result instanceof Promise || typeof (result as any).then === "function";

export const isNullish = <T>(input: T): input is NullOrUndefined<T> =>
  input == null;

export const isNotNullish = <T>(input: T): input is NonNullable<T> =>
  !isNullish(input);

export const isObject = (input: unknown): input is NonNullable<object> =>
  !isNullish(input) && typeof input === "object";

/**
 * Enforces compile-time exhaustiveness checking for discriminated unions.
 *
 * This function should be unreachable if all union members are handled via control flow
 * narrowing. A compiler error at the call site indicates a missing case in the
 * conditional logic.
 *
 * @param input - The subject of the check, which must be narrowed to `never`.
 * @throws {TypeError} At runtime if an unhandled value breaches the control flow.
 *
 * @example
 * type SchroedingerState = { status: 'alive' } | { status: 'dead' };
 *
 * function openBox(cat: SchroedingerState) {
 *    if (cat.status === "alive") return "full of life";
 *    else if (cat.status === "dead") return "stone dead";
 *    else exhaustOptions(cat);
 * }
 */
export const exhaustOptions = (input: never): never => {
  throw new TypeError(`unreachable branch reached.. :)`, input);
};
