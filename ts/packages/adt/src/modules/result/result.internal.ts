import type { CheckExistence } from "#intern/types";
import { GET_PROTO_OF, typeOf } from "#utility/guard/index.js";
import type { JsTypeMap } from "#utility/guard/internal.types.js";
import { tryCatch } from "#utility/misc/tryCatch.js";
import type { Expect, IsEqual, Simplify } from "#utility/types/general.js";
import type { AnyFunction, JsType } from "#utility/types/guard.js";
import type { Oper, OperGuard } from "#utility/types/oper.js";
import { SafeExecutionError } from "./execution.error.js";
import { type Err, err } from "./primitive.js";

export type OkNotNever<T> = CheckExistence<
  T,
  "❌ Mapping Ok on a guaranteed error"
>;

export type ErrNotNever<E> = CheckExistence<
  E,
  "❌ Mapping Err on guaranteed success"
>;
export const mapErrSafely =
  (originalError: unknown) =>
  (mapperError: unknown): Err<SafeExecutionError> =>
    err(new SafeExecutionError(originalError, mapperError));

const TUPLE_DISCRIMINATORS = [
  "isNative",
  "isNullable",
  "isObject",
  "isPrimitive",
  "isFunction",
] as const;
type ErrorCauseMap = {
  // includes bigint which is safely serialized into ctxt.message
  isPrimitive: JsTypeMap[Exclude<JsType, "object" | "function" | "undefined">];
  isNative: Error;
  /** an object that is NOT a native `Error` nor `null` */
  isObject: object;
  isNullable: null | undefined;
  isFunction: AnyFunction;
};
type DiscriminatorTuple = typeof TUPLE_DISCRIMINATORS;
type Discriminator = DiscriminatorTuple[number];

type _Check = Expect<IsEqual<keyof ErrorCauseMap, Discriminator>>;
declare const _check: _Check;

// attach all discriminators to the error context on the type level. at runtime, only the `true` prop exists.
// this is fine because thrown errors are rare (only at boundery) and handling them is expensive anyway
type ErrorCtxtDiscrMap<T extends Discriminator> = Record<T, true> & {
  [K in Exclude<Discriminator, T>]?: false;
};
export type ErrorContext = {
  [K in Discriminator]: Simplify<
    { cause: ErrorCauseMap[K]; message: string } & ErrorCtxtDiscrMap<K>
  >;
}[Discriminator];

export type GetErrorContext<D extends Discriminator = Discriminator> = {
  [K in D]: Extract<ErrorContext, Record<K, true>>;
}[D];

const makeContext = <D extends 0 | 1 | 2 | 3 | 4>(
  idx: D,
  cause: Extract<ErrorContext, Record<DiscriminatorTuple[D], true>>["cause"],
  message: string,
): Extract<ErrorContext, Record<D, true>> =>
  ({
    [TUPLE_DISCRIMINATORS[idx] as string]: true,
    cause: cause,
    message: message,
  }) as Extract<ErrorContext, Record<D, true>>;

const isNativeError: OperGuard<unknown, Error> = (cause =>
  cause instanceof Error
  || Object.prototype.toString.call(cause) === "[object Error]") as OperGuard<
  unknown,
  Error
>;

const bigintToStr = (value: unknown) =>
  typeOf(value as bigint, 6) ? `${(value as bigint).toString()}n` : value;
const replacer = (_: string, value: unknown) => bigintToStr(value);
type TreatedAsPrimitive = string | boolean | number | symbol | bigint;

const UNSERIALIZABLE_MSG = (msg: string) => `[Unserializable Object]: ${msg}`;

// biome-ignore format: readability
export const contextProvider: Oper<unknown, ErrorContext> = cause =>
  isNativeError(cause)  
      ? makeContext(0, // toggle `isNative`
               cause, 
               cause.message
        )
  : cause == null       
      ? makeContext(1, // toggle `isNullable`
               cause, 
               String(cause)
        )
  : typeOf(cause, 0 /* check object */)
      ? makeContext(2, // toggle `isObject`
               cause, 
               tryCatch(
                  () => 
                    typeOf((cause as Record<"message",TreatedAsPrimitive>).message, 1  /* check string */)
                      ? (cause as Record<"message",string>).message
                      : JSON.stringify(cause, replacer /* stringify encountered bigints */ ),
                  () => 
                    // avoid serializing objects without a .toString
                    GET_PROTO_OF(cause) === null 
                      ? UNSERIALIZABLE_MSG('Prototype is null')
                      // just in case someone was being funny and modified toString
                      : tryCatch(
                           ()=>String(cause),
                           ()=> UNSERIALIZABLE_MSG('Stringification failed')
                        ),
               )
        )
    // primitives wrapped in an object fail this test. undefined and null were handled earlier
  : Object(cause) !== cause 
      ? makeContext(3, // toggle `isPrimitive`
               cause as TreatedAsPrimitive,
               String(bigintToStr(cause)),
        )
    // toggle `isFunction` (who t.f. does this?)
  : makeContext(4, cause as AnyFunction, String(cause));
