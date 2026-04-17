export type AnyFunction = (...args: any[]) => unknown;

export type Expect<T extends true> = T;
// biome-ignore format: readability
export type IsEqual<A, B> =
  (<T>() => T extends A ? 1 : 2) extends 
  (<T>() => T extends B ? 1 : 2) 
    ? true 
    : false;

// biome-ignore format: readability
export type IsMemberOf<T, U> = true extends
  (U extends U ? IsEqual<T, U> : never)
    ? true
    : false;

// biome-ignore format: readability
export type Difference<T, U> = T extends T
  ? (true extends IsMemberOf<T, U> ? never : T)
  : never;

export type Simplify<T> = T extends AnyFunction
  ? T
  : T extends object
    ? { [K in keyof T]: T[K] }
    : T;

export type Identity<A, B> =
  true extends IsEqual<Simplify<A>, Simplify<B>>
    ? true
    : {
        Excess: Difference<A, B>;
        Deficit: Difference<B, A>;
      };
