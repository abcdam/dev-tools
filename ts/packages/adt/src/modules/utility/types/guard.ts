import type { JsTypeMap } from "#utility/guard/internal.types.js";

export type Defined<T> = Exclude<T, null | undefined>;

export type FalsyValues = null | undefined | false | "" | 0 | 0n;

export type Falsy<T> = Extract<T, FalsyValues>;
export type Truthy<T> = Exclude<T, FalsyValues>;

export type BaseRecord = Record<PropertyKey, unknown>;
export type BaseList = readonly unknown[];
export type JsType<T extends keyof JsTypeMap = keyof JsTypeMap> = T; // biome-ignore lint/complexity/noBannedTypes: <ok for type exclusions>
export type AnyFunction = Function;
