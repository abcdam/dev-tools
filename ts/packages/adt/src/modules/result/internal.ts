import type { Err, Ok, Result } from "@result:core/types";

export type UnwrapOk<R> = R extends Ok<infer V> ? V : never;

export type UnwrapErr<R> = R extends Err<infer E> ? E : never;

export type AnyResult = Result<any, any>;
export type Awaitable<T> = T | Promise<T>;
