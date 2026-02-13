export type Oper<in In, out Out> = (input: In) => Out;

export type OperAsync<in In, out Out> = Oper<Awaited<In>, Out | Promise<Out>>;
