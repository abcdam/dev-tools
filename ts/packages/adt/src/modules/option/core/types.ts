export type Some<out T> = { readonly exists: true; readonly value: T };
export type None = { readonly exists: false };
export type Option<T> = Some<T> | None;
