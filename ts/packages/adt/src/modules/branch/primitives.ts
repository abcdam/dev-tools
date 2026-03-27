export type Left<out T> = { readonly branch: "left"; readonly value: T };
export type Right<out T> = { readonly branch: "right"; readonly value: T };
export type Branch<L, R> = Left<L> | Right<R>;

export const left = <L>(value: L): Left<L> => ({ branch: "left", value });
export const right = <R>(value: R): Right<R> => ({ branch: "right", value });
