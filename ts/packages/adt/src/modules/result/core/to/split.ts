import type { InferErr, InferOk, ResultBase } from "#result/primitive.js";

type BaseReturnSplit = { oks: unknown[]; errs: unknown[] };

const _splitList = (results: ResultBase[]): BaseReturnSplit => {
  const oks = [];
  const errs = [];
  const limit = results.length;
  for (let i = 0; i < limit; i++) {
    const item = results[i] as ResultBase;
    if (item.ok) oks.push(item.val);
    else errs.push(item.err);
  }
  return { oks, errs };
};
const _splitIter = (results: Iterable<ResultBase>): BaseReturnSplit => {
  const oks = [];
  const errs = [];

  for (const result of results)
    if (result.ok) oks.push(result.val);
    else errs.push(result.err);

  return { oks, errs };
};
export function split<const R extends readonly ResultBase[]>(
  results: R,
): { oks: InferOk<R[number]>[]; errs: InferErr<R[number]>[] };
export function split<R extends ResultBase>(
  results: Iterable<R>,
): { oks: InferOk<R>[]; errs: InferErr<R>[] };
export function split(
  results: ResultBase[] | Iterable<ResultBase>,
): BaseReturnSplit {
  return Array.isArray(results) ? _splitList(results) : _splitIter(results);
}
