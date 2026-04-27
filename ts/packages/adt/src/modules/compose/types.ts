export type Oper<in In, out Out> = (this: void, input: In) => Out;
export type BaseOper = Oper<never, unknown>;
export type InferIn<O extends BaseOper> =
  O extends Oper<infer In, any> ? In : never;
export type InferOut<O extends BaseOper> =
  O extends Oper<any, infer Out> ? Out : never;

export type OperAsync<in In, out Out> = Oper<
  Awaited<In>,
  Promise<Awaited<Out>>
>;
