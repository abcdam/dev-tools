import type { Err, Ok, Result } from "./types.js";

export const isOk = <T, E>(input: Result<T, E>): input is Ok<T> => input.ok;
export const isErr = <T, E>(input: Result<T, E>): input is Err<E> => !input.ok;

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
