import type { None, Some } from "./types";

export const some = <T>(value: T): Some<T> => ({ some: true, value });

export const none = (): None => ({ some: false });
