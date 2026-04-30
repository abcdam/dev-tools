import type { Result, ResultBase } from "#result/primitive.js";
import type { OperThink, OperWho } from "#utility/types/oper.js";

type BaseReturnCompact = unknown[];
type TapUnknownFn = (errValue: unknown) => void;

const _fromListTappedCollect = (
  results: ResultBase[],
  tapFn: TapUnknownFn,
): BaseReturnCompact => {
  const oks = [];
  const limit = results.length;
  for (let i = 0; i < limit; i++) {
    const item = results[i] as ResultBase;
    if (item.ok) oks.push(item.val);
    else tapFn(item.err);
  }
  return oks;
};
const _fromIterTappedCollect = (
  results: Iterable<ResultBase>,
  tapFn: TapUnknownFn,
): BaseReturnCompact => {
  const oks = [];
  for (const item of results)
    if (item.ok) oks.push(item.val);
    else tapFn(item);
  return oks;
};

export function collectTapped<E>(
  think: OperThink<E>,
): <T>(results: Result<T, E>) => T[];

export function collectTapped<E>(
  think: OperThink<E>,
): <T>(results: Iterable<Result<T, E>>) => T[];

export function collectTapped(
  think: OperWho<void>,
): (results: any) => BaseReturnCompact {
  return results => {
    return Array.isArray(results)
      ? _fromListTappedCollect(results, think)
      : _fromIterTappedCollect(results, think);
  };
}
