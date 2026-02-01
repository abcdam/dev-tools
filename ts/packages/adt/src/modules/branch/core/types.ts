export type Left<T> = { readonly branch: "left"; readonly value: T };
export type Right<T> = { readonly branch: "right"; readonly value: T };
export type Branch<L, R> = Left<L> | Right<R>;
