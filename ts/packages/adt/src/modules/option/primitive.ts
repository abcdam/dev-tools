//
// TYPES
//
export type Some<out T> = { readonly exists: true; readonly value: T };

export type None = { readonly exists: false };

export type Option<T> = Some<T> | None;

//
// FACTORIES
//
const NONE: None = /*#__PURE__*/ { exists: false } as const;
export const none = (): None => NONE;

export const some = <T>(value: T): Some<T> => ({ exists: true, value });

export const isSome = <T>(value: Option<T>): value is Some<T> =>
  value.exists === true;
export const isNone = <T>(value: Option<T>): value is None =>
  value.exists === false;
