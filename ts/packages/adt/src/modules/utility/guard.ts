export type NullOrUndef = null | undefined;

export type NullOrUndefined<T> = Extract<T, NullOrUndef>;
export type NeverNullOrUndefined<T> = Exclude<T, NullOrUndef>;

export type FalsyValues = NullOrUndef | false | "" | 0 | 0n;

export type NeverFalsy<T> = Exclude<T, FalsyValues>;
export type Falsy<T> = Extract<T, FalsyValues>;

export type GuardFn<in I, out O extends I> = (v: I) => v is O;

export const isPromiseLike = <T>(
  result: T | PromiseLike<T>,
): result is PromiseLike<T> =>
  result instanceof Promise ||
  (result != null &&
    (typeof result === "object" || typeof result === "function") &&
    // biome-ignore lint/suspicious/noExplicitAny: <use ducktyping to handle different Promise implementations>
    typeof (result as any).then === "function");

export const isNullish = <T>(input: T): input is NullOrUndefined<T> =>
  input == null;

export const isNotNullish = <T>(input: T): input is NeverNullOrUndefined<T> =>
  input != null;

export const isNotFalsy = <T>(input: T): input is NeverFalsy<T> => !!input;
export const isFalsy = <T>(input: T): input is Falsy<T> => !input;
export const isObject = (
  input: unknown,
): input is NeverNullOrUndefined<object> =>
  input != null && typeof input === "object";

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
