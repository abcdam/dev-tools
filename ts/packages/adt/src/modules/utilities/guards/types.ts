export type NullOrUndefined<T> = Extract<T, null | undefined>;

export type NeverNullOrUndefined<T> = Exclude<T, null | undefined>;

export type GuardFn<in I, out O extends I> = (v: I) => v is O;
