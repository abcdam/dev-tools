import { _NONE } from "./const.js";
import { _S } from "./construct.internal.js";

// TYPES
export type BaseOption = Option<unknown>;
export type InferSome<O extends BaseOption> =
  O extends Some<infer T> ? T : never;

export type InferSomes<T extends readonly BaseOption[]> = {
  -readonly [K in keyof T]: InferSome<T[K]>;
};

export type Some<out T> = { readonly exists: true; readonly val: T };

export type None = { readonly exists: false };

export type Option<T> = Some<T> | None;

//
// FACTORIES
export const some: <T>(val: T) => Some<T> = v => new _S(v);
export const none: () => None = () => _NONE;

export const isSome: <T>(o: Option<T>) => o is Some<T> = opt =>
  opt.exists === true;
export const isNone: <T>(o: Option<T>) => o is None = opt =>
  opt.exists === false;

export const ensureOptionShape = (input: unknown): Option<unknown> => {
  if (input == null || typeof input !== "object" || !("val" in input))
    return _NONE;
  if (!("exists" in input) || input.exists === true) return some(input.val);
  return _NONE;
};
