import type { Equal } from "#result/core/from/test.js";
import type { Expect } from "#utility/types/general.js";
import type { AnyFunction } from "#utility/types/guard.js";

export const JS_TYPE_LIST = [
  "object",
  "string",
  "number",
  "function",

  "boolean",
  "symbol",

  "bigint",
  "undefined",
] as const;

export type JsTypeList = typeof JS_TYPE_LIST;
export type JsType = JsTypeList[number];

export type JsTypeMap = {
  string: string;
  number: number;
  bigint: bigint;
  boolean: boolean;
  symbol: symbol;
  undefined: undefined;
  object: object | null;
  function: AnyFunction;
};

type _Check = Expect<Equal<keyof JsTypeMap, JsType>>;
declare const _check: _Check;
