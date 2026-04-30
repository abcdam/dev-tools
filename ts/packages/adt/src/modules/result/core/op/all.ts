import {
  type InferErr,
  type InferOk,
  type InferOks,
  ok,
  type Result,
  type ResultBase,
} from "#result/primitive.js";

type BaseReturnAll = Result<unknown[], unknown>;
const _fromList = (results: ResultBase[]): BaseReturnAll => {
  const length = results.length;
  const oks = new Array(length);
  for (let i = 0; i < length; i++) {
    const result = results[i]!;
    if (result.ok) oks[i] = result.val;
    else return result;
  }
  return ok(oks);
};
const _fromIter = (results: Iterable<ResultBase>): BaseReturnAll => {
  const oks = [];
  for (const result of results)
    if (result.ok) oks.push(result.val);
    else return result;
  return ok(oks);
};

export function all<const R extends readonly ResultBase[]>(
  results: R,
): Result<InferOks<R>, InferErr<R[number]>>;

export function all<R extends ResultBase>(
  results: Iterable<R>,
): Result<InferOk<R>[], InferErr<R>>;

export function all(
  results: ResultBase[] | Iterable<ResultBase>,
): BaseReturnAll {
  return Array.isArray(results) ? _fromList(results) : _fromIter(results);
}
