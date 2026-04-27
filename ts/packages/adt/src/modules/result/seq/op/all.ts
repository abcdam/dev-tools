import type { BaseResult, Result } from "#result/primitive.js";

type BaseReturnCompact = unknown[];
type TapUnknownFn = (errValue: unknown) => void;

const _fromListTappedCollect = (
  results: BaseResult[],
  tapFn: TapUnknownFn,
): BaseReturnCompact => {
  const oks = [];
  const limit = results.length;
  for (let i = 0; i < limit; i++) {
    const item = results[i] as BaseResult;
    if (item.ok) oks.push(item.val);
    else tapFn(item.err);
  }
  return oks;
};
const _fromIterTappedCollect = (
  results: Iterable<BaseResult>,
  tapFn: TapUnknownFn,
): BaseReturnCompact => {
  const oks = [];
  for (const item of results)
    if (item.ok) oks.push(item.val);
    else tapFn(item);
  return oks;
};

export function collectTapped<E>(
  tapErr: (errValue: E) => void,
): <T>(results: Result<T, E>) => T[];

export function collectTapped<E>(
  tapErr: (errValue: E) => void,
): <T>(results: Iterable<Result<T, E>>) => T[];

export function collectTapped(
  tapErr: TapUnknownFn,
): (results: any) => BaseReturnCompact {
  return results => {
    return Array.isArray(results)
      ? _fromListTappedCollect(results, tapErr)
      : _fromIterTappedCollect(results, tapErr);
  };
}
