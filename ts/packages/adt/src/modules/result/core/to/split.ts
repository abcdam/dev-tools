import type { BaseResult, InferErr, InferOk } from "#result/primitive.js";

type BaseReturnSplit = { oks: unknown[]; errs: unknown[] };

const _splitList = (results: BaseResult[]): BaseReturnSplit => {
  const oks = [];
  const errs = [];
  const limit = results.length;
  for (let i = 0; i < limit; i++) {
    const item = results[i] as BaseResult;
    if (item.ok) oks.push(item.val);
    else errs.push(item.err);
  }
  return { oks, errs };
};
const _splitIter = (results: Iterable<BaseResult>): BaseReturnSplit => {
  const oks = [];
  const errs = [];

  for (const result of results)
    if (result.ok) oks.push(result.val);
    else errs.push(result.err);

  return { oks, errs };
};
export function split<const R extends readonly BaseResult[]>(
  results: R,
): { oks: InferOk<R[number]>[]; errs: InferErr<R[number]>[] };
export function split<R extends BaseResult>(
  results: Iterable<R>,
): { oks: InferOk<R>[]; errs: InferErr<R>[] };
export function split(
  results: BaseResult[] | Iterable<BaseResult>,
): BaseReturnSplit {
  return Array.isArray(results) ? _splitList(results) : _splitIter(results);
}
