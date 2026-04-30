import type {
  AnyFunction,
  BaseRecord,
  Defined,
  Falsy,
  BaseList as ListBase,
  Truthy,
} from "#utility/types/guard.js";
import {
  JS_TYPE_LIST,
  type JsTypeList,
  type JsTypeMap,
} from "./internal.types.js";

const NULL = null;

export const GET_PROTO_OF: typeof Object.getPrototypeOf = Object.getPrototypeOf;
/**
 * `typeof` wrapper: Narrows down the input type using js base types according to that built-in.
 *
 * #### ID map
 *
| id | typeof    |
|----|-----------|
| `0`  | `object`    |
| `1`  | `string`    |
| `2`  | `number`    |
| `3`  | `function`  |
| `4`  | `boolean`   |
| `5`  | `symbol`    |
| `6`  | `bigint`    |
| `7`  | `undefined` |
 *
 * #### Notes:
 * - infinite (top) types like `unknown` or `any` destroy inference
 * - -> great tools already exist for "parse & validate" workflows (e.g. valibot)
 *
 * @param input - a union of known types
 * @param select integer from 0-7 according to the ID map
 * @returns
 */

export const typeOf = <T, U extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>(
  input: T,
  select: U,
): input is Extract<T, JsTypeMap[JsTypeList[U]]> =>
  typeof input === JS_TYPE_LIST[select];

export const isPromiseLike = <T>(
  input: T | PromiseLike<T>,
): input is PromiseLike<T> =>
  ((typeOf(input, 0) && input !== NULL) || typeOf(input, 1))
  && typeOf((input as any).then, 3);

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
    const proto = GET_PROTO_OF(input);
    check = proto === NULL || GET_PROTO_OF(proto) === NULL;
  }
  return check;
};
export const isNotRecord = <T>(input: T): input is Exclude<T, BaseRecord> =>
  !isRecord(input);

export const isList: <T>(input: T) => input is Extract<T, ListBase> =
  Array.isArray as any;
/**
 * Guard for `object` runtime type constrained to pojos and classes
 * @param input
 * @returns
 */

export const isRecordLike = <T>(
  input: T,
): input is Extract<Exclude<T, AnyFunction | ListBase>, object> =>
  isJsObject(input) && !isList(input);

export const isNotRecordLike = <T>(
  input: T,
): input is Exclude<Extract<T, object>, AnyFunction | ListBase> =>
  isNotJsObject(input) || isList(input);
/**
 * Guard for `object` runtime type
 * - **null** -> false
 * @param input
 * @returns
 */

export const isJsObject = <T>(
  input: T,
): input is Exclude<Extract<T, object>, AnyFunction> =>
  typeOf(input, 0) && input !== NULL;
/**
 * Guard for anything but `object` runtime type
 * - **null** -> true
 * @param input
 * @returns
 */

export const isNotJsObject = <T>(input: T): input is Exclude<T, object> =>
  !typeOf(input, 0) || input === NULL;

export function isListEmpty<T>(list: T[]): list is [];
export function isListEmpty<T>(list: readonly T[]): list is readonly [];
export function isListEmpty(list: ListBase): boolean {
  return list.length === 0;
}
export function isNotListEmpty<T>(list: T[]): list is [T, ...T[]];
export function isNotListEmpty<T>(
  list: readonly T[],
): list is readonly [T, ...T[]];

export function isNotListEmpty(list: any): any {
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
