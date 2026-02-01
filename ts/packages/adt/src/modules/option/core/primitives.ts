import type { None, Some } from "./types.js";

const NONE: None = /*#__PURE__*/ { exists: false } as const;
export const none = (): None => NONE;
export const some = <T>(value: T): Some<T> => ({ exists: true, value });
