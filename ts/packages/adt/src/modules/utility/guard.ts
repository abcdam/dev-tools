import type { AnyFunction, Expect, Identity } from "./types.js";

export type NullOrUndefined<T> = Extract<T, null | undefined>;
export type NotNullOrUndefined<T> = Exclude<T, null | undefined>;

export type FalsyValues = null | undefined | false | "" | 0 | 0n;

export type Falsy<T> = Extract<T, FalsyValues>;
export type NotFalsy<T> = Exclude<T, FalsyValues>;

export type GuardFn<in I, out O extends I> = (v: I) => v is O;
export type PredicateFn<in I> = (v: I) => boolean;

const gpo = Object.getPrototypeOf;
export const isPromiseLike = <T>(v: T | PromiseLike<T>): v is PromiseLike<T> =>
  ((typeof v === "object" && v != null) || typeof v === "function")
  && typeof (v as any).then === "function";

export const isNotPromiseLike = <T>(v: T | PromiseLike<T>): v is T =>
  typeof v !== "object"
  || typeof v !== "function"
  || typeof (v as any).then !== "function";
export const isNullish = <T>(input: T): input is NullOrUndefined<T> =>
  input == null;

export const isNotNullish = <T>(input: T): input is NotNullOrUndefined<T> =>
  input != null;

export const isFalsy = <T>(input: T): input is Falsy<T> => !input;
export const isNotFalsy = <T>(input: T): input is NotFalsy<T> => !!input;

export const isRecord = <T>(
  input: T,
): input is Extract<T, Record<PropertyKey, unknown>> => {
  if (typeof input !== "object" || input == null) return false;
  const proto = gpo(input);
  return proto == null || gpo(proto) == null;
};

export const isRecordLike = <T>(
  input: T,
): input is Exclude<Extract<T, object>, AnyFunction | readonly unknown[]> =>
  typeof input === "object" && input != null && !Array.isArray(input);

export function isListEmpty<T>(list: T[]): list is [];
export function isListEmpty<T>(list: readonly T[]): list is readonly [];
export function isListEmpty(list: readonly unknown[]): boolean {
  return list.length === 0;
}

export function isNotListEmpty<T>(list: T[]): list is [T, ...T[]];
export function isNotListEmpty<T>(
  list: readonly T[],
): list is readonly [T, ...T[]];
export function isNotListEmpty(list: readonly unknown[]): boolean {
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

/*
 * Quick tests
 */
type MyRecord = { id: number; label: string };
declare class Person {
  lastName: string;
}
type GetErrorFn = () => Error;
type UnionBag =
  | MyRecord
  | null
  | undefined
  | number
  | GetErrorFn
  | string[]
  | readonly number[]
  | [string, number]
  | Date
  | Person;

type GuardedType<T> = T extends (input: any) => input is infer R ? R : never;

type Got = GuardedType<typeof isRecordLike<UnionBag>>;
type Expected = MyRecord | Date | Person;
type _TestRecordOrClass = Expect<Identity<Got, Expected>>;
