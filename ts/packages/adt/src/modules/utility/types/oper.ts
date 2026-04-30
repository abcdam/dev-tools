export type Oper<in In, out Out> = (this: void, input: In) => Out;
export type OperEcho<in out T> = Oper<T, T>;
export type OperWho<out Out> = Oper<unknown, Out>;

export type OperThunk<out Out> = Oper<void, Out>;
export type OperThink<in In> = Oper<In, void>;
export type OperThonk = Oper<void, void>;
export type OperBase = Oper<never, unknown>;
export type OperA<in In, out Out> = Oper<In, Promise<Awaited<Out>>>;
export type OperAWho<out Out> = OperA<unknown, Out>;
export type OperAEcho<in out T> = OperA<T, T>;
export type OperAThunk<out Out> = OperA<void, Out>;
export type OperAThink<in In> = OperA<In, void>;
export type OperAThonk = OperA<void, void>;

export type OperGuard<in I, out O extends I> = (
  this: void,
  input: I,
) => input is O;
export type OperPredicate<in I> = Oper<I, boolean>;

export type InferOperIn<O extends OperBase> =
  O extends Oper<infer In, any> ? In : never;
export type InferOperOut<O extends OperBase> =
  O extends Oper<any, infer Out> ? Out : never;
