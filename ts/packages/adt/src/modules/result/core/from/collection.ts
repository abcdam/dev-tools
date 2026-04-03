import {
  type BaseResult,
  type InferErr,
  type InferOk,
  type InferOks,
  ok,
  type Result,
} from "#result/primitive.js";

type CollectReturn = Result<unknown[], unknown>;
const _collectList = (results: BaseResult[]): CollectReturn => {
  const length = results.length;
  const oks = new Array(length);
  for (let i = 0; i < length; i++) {
    const result = results[i]!;
    if (result.ok) oks[i] = result.value;
    else return result;
  }
  return ok(oks);
};
const _collectIter = (results: Iterable<BaseResult>): CollectReturn => {
  const oks = [];
  for (const result of results)
    if (result.ok) oks.push(result.value);
    else return result;
  return ok(oks);
};

export function collect<const T extends readonly BaseResult[]>(
  results: T,
): Result<InferOks<T>, InferErr<T[number]>>;

export function collect<U extends BaseResult>(
  results: Iterable<U>,
): Result<InferOk<U>[], InferErr<U>>;

export function collect(
  results: BaseResult[] | Iterable<BaseResult>,
): CollectReturn {
  return Array.isArray(results) ? _collectList(results) : _collectIter(results);
}
