import type { Oper, OperA } from "#utility/types/oper.js";
import { _NONE, _Some } from "./construct.internal.js";
// TYPES
export type OptionBase = Option<unknown>;
export type InferSome<O extends OptionBase> =
  O extends Some<infer T> ? T : never;

export type InferSomes<T extends readonly OptionBase[]> = {
  -readonly [K in keyof T]: InferSome<T[K]>;
};

export type Some<out T> = { readonly exists: true; readonly val: T };

export type None = { readonly exists: false };

export type Option<T> = Some<T> | None;

export type OperOption_O<in In, out T> = Oper<In, Option<T>>;
export type OperOption_I<in T, out Out> = Oper<Option<T>, Out>;
export type OperOption_IO<in T, out U> = Oper<Option<T>, Option<U>>;
export type OperAOption_O<in In, out T> = OperA<In, Option<T>>;
export type OperAOption_IO<in T, out U> = OperA<Option<T>, Option<U>>;
//
// FACTORIES
export const some: <T>(val: T) => Some<T> = v => new _Some(v);
export const none: () => None = () => _NONE;

export const isSome: <T>(o: Option<T>) => o is Some<T> = opt =>
  opt.exists === true;
export const isNone: <T>(o: Option<T>) => o is None = opt =>
  opt.exists === false;
