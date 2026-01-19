export type Some<T> = { some: true; value: T };
export type None = { some: false };
export type Option<T> = Some<T> | None;
