const delimiters = [",", "|", " "] as const;

type Delimiter = (typeof delimiters)[number];

export type JoinStringList<
  List extends readonly string[],
  Del extends Delimiter,
  _Acc extends string = "",
  _CurrDel extends string = "",
> = List extends readonly [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? JoinStringList<Tail, Del, `${_Acc}${_CurrDel}${Head}`, Del>
  : _Acc;

export type OrdSubset<
  T extends readonly string[],
  _Acc extends readonly string[] = [] | never,
> = T extends readonly [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? OrdSubset<Tail, _Acc | [...Extract<_Acc, readonly string[]>, Head] | [Head]>
  : _Acc;
