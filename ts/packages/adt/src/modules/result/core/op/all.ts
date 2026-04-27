import {
  type BaseResult,
  type InferErr,
  type InferOk,
  type InferOks,
  ok,
  type Result,
} from "#result/primitive.js";

type BaseReturnAll = Result<unknown[], unknown>;
const _fromList = (results: BaseResult[]): BaseReturnAll => {
  const length = results.length;
  const oks = new Array(length);
  for (let i = 0; i < length; i++) {
    const result = results[i]!;
    if (result.ok) oks[i] = result.val;
    else return result;
  }
  return ok(oks);
};
const _fromIter = (results: Iterable<BaseResult>): BaseReturnAll => {
  const oks = [];
  for (const result of results)
    if (result.ok) oks.push(result.val);
    else return result;
  return ok(oks);
};

export function all<const R extends readonly BaseResult[]>(
  results: R,
): Result<InferOks<R>, InferErr<R[number]>>;

export function all<R extends BaseResult>(
  results: Iterable<R>,
): Result<InferOk<R>[], InferErr<R>>;

export function all(
  results: BaseResult[] | Iterable<BaseResult>,
): BaseReturnAll {
  return Array.isArray(results) ? _fromList(results) : _fromIter(results);
}
