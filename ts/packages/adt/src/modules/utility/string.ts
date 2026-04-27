import type { Oper } from "#compose/types.js";
import { _NONE } from "#option/construct.internal.js";
import { type Option, some } from "#option/primitive.js";

export const includes_: (
  needle: string,
  startAt?: number,
) => Oper<string, boolean> = (needle, startAt) => haystack =>
  haystack.includes(needle, startAt);
export const includedIn: (
  haystack: string,
  startAt?: number,
) => Oper<string, boolean> = (haystack, startAt) => needle =>
  haystack.includes(needle, startAt);

export const toLowerCase_: <T extends string>(str: T) => Lowercase<T> = str =>
  str.toLowerCase() as any;

export const toLocaleLowerCase_: <T extends string>(
  str: T,
  opts?: Intl.LocalesArgument,
) => Lowercase<T> = (str, opts) => str.toLocaleLowerCase(opts) as any;

export const toUpperCase_: <T extends string>(str: T) => Uppercase<T> = str =>
  str.toUpperCase() as any;
export const toLocaleUpperCase_: <T extends string>(
  str: T,
  opts?: Intl.LocalesArgument,
) => Uppercase<T> = (str, opts) => str.toLocaleUpperCase(opts) as any;

export const test_: (re: RegExp) => Oper<string, boolean> = re => target =>
  re.test(target);

export const startsWith_ =
  <T extends string>(prefix: T) =>
  (target: string): target is `${T}${string}` =>
    target.startsWith(prefix);

export const endsWith_ =
  <T extends string>(postfix: T) =>
  (target: string): target is `${string}${T}` =>
    target.endsWith(postfix);

export const trim_: Oper<string, string> = str => str.trim();

export const split_: (
  sep: string | RegExp,
  maxItems?: number,
) => Oper<string, string[]> = (sep, maxItems) => target =>
  target.split(sep, maxItems);

export const slice_: (startAt: number, endAt?: number) => Oper<string, string> =
  (startAt, endAt) => target =>
    target.slice(startAt, endAt);

export const replace_: (
  searchPat: string | RegExp,
  replacement: string,
) => Oper<string, string> = (search, replaceWith) => target =>
  target.replace(search, replaceWith);

export const replaceAll_: (
  search: string | RegExp,
  replaceWith: string,
) => Oper<string, string> = (searchPat, replaceWith) => target =>
  target.replaceAll(searchPat, replaceWith);

export const match_ =
  (re: RegExp): Oper<string, Option<RegExpMatchArray>> =>
  target => {
    const result = target.match(re);
    return result !== null ? some(result) : _NONE;
  };
export const matchAll_ =
  (re: RegExp): Oper<string, RegExpStringIterator<RegExpExecArray>> =>
  target =>
    target.matchAll(re);
