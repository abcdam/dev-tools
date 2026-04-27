import type { AnyFunction } from "../types.js";
export type Defined<T> = Exclude<T, null | undefined>;

export type FalsyValues = null | undefined | false | "" | 0 | 0n;

export type Falsy<T> = Extract<T, FalsyValues>;
export type Truthy<T> = Exclude<T, FalsyValues>;

export type GuardFn<in I, out O extends I> = (input: I) => input is O;

export type PredicateFn<in I> = (input: I) => boolean;
export type BaseRecord = Record<PropertyKey, unknown>;
export type BaseList = readonly unknown[];

type JsTypeMap = {
  string: string;
  number: number;
  bigint: bigint;
  boolean: boolean;
  symbol: symbol;
  undefined: undefined;
  object: object | null;
  // biome-ignore lint/complexity/noBannedTypes: <used for exclusion>
  function: Function;
};

export type JsType<T extends keyof JsTypeMap = keyof JsTypeMap> = T;

export const STR_OBJECT = "object";
export const STR_FUNCTION = "function";

export const NULL = null;
const getProto = Object.getPrototypeOf;
const isArray = Array.isArray;

/**
 * `typeof` wrapper: Narrows down the input type using js base types according to that built-in.
 * - infinite (top) types like `unknown` or `any` destroy inference
 * - -> great tools already exist for "parse & validate" workflows (e.g. valibot)
 * @param input - a union of known types
 * @param ty
 * @returns
 */
export const typeOf = <T, U extends JsType>(
  input: T,
  ty: U,
): input is Extract<T, JsTypeMap[U]> => typeof input === ty;

export const isPromiseLike = <T>(
  input: T | PromiseLike<T>,
): input is PromiseLike<T> =>
  ((typeOf(input, STR_OBJECT) && input !== NULL) || typeOf(input, STR_FUNCTION))
  && typeOf((input as any).then, STR_FUNCTION);

export const isNotPromiseLike = <T>(input: T | PromiseLike<T>): input is T =>
  !isPromiseLike(input);

export const isNullish = <T>(
  input: T | null | undefined,
): input is null | undefined =>
  // biome-ignore lint/suspicious/noDoubleEquals: <intentional>
  input == NULL;

export const isNotNullish = <T>(input: T): input is Defined<T> =>
  // biome-ignore lint/suspicious/noDoubleEquals: <intentional>
  input != NULL;

export const isNotTruthy = <T>(input: T): input is Falsy<T> => !input;
export const isTruthy = <T>(input: T): input is Truthy<T> => !!input;

export const isRecord = <T>(input: T): input is Extract<T, BaseRecord> => {
  let check = isJsObject(input);
  if (check) {
    const proto = getProto(input);
    check = proto === NULL || getProto(proto) === NULL;
  }
  return check;
};
export const isNotRecord = <T>(input: T): input is Exclude<T, BaseRecord> =>
  !isRecord(input);

/**
 * Guard for `object` runtime type constrained to pojos and classes
 * @param input
 * @returns
 */
export const isRecordLike = <T>(
  input: T,
): input is Extract<Exclude<T, AnyFunction | BaseList>, object> =>
  isJsObject(input) && !isArray(input);

export const isNotRecordLike = <T>(
  input: T,
): input is Exclude<Extract<T, object>, AnyFunction | BaseList> =>
  isNotJsObject(input) || isArray(input);

/**
 * Guard for `object` runtime type
 * - **null** -> false
 * @param input
 * @returns
 */
export const isJsObject = <T>(
  input: T,
): input is Exclude<Extract<T, object>, AnyFunction> =>
  typeOf(input, STR_OBJECT) && input !== NULL;

/**
 * Guard for anything but `object` runtime type
 * - **null** -> true
 * @param input
 * @returns
 */
export const isNotJsObject = <T>(input: T): input is Exclude<T, object> =>
  !typeOf(input, STR_OBJECT) || input === NULL;
export function isListEmpty<T>(list: T[]): list is [];
export function isListEmpty<T>(list: readonly T[]): list is readonly [];
export function isListEmpty(list: BaseList): boolean {
  return list.length === 0;
}

export function isNotListEmpty<T>(list: T[]): list is [T, ...T[]];
export function isNotListEmpty<T>(
  list: readonly T[],
): list is readonly [T, ...T[]];
export function isNotListEmpty(list: BaseList): boolean {
  return list.length > 0;
}

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
