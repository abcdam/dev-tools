import type { BaseOption, InferSome, Option } from "#option/primitive.js";

type AllReturn = unknown[];
const _fromList = (options: BaseOption[], limit: number): AllReturn => {
  const allSomes = [];
  for (let i = 0; i < limit; i++) {
    const option = options[i] as BaseOption;
    if (option.exists === true) allSomes.push(option.val);
  }
  return allSomes;
};
const _fromIter = (options: Iterable<BaseOption>): AllReturn => {
  const allSomes = [];
  for (const option of options)
    if (option.exists === true) allSomes.push(option.val);
  return allSomes;
};

export function sift<const T extends readonly BaseOption[]>(
  options: T,
): InferSome<T[number]>[];

export function sift<U extends BaseOption>(
  options: Iterable<U>,
): InferSome<U>[];

export function sift(options: BaseOption[] | Iterable<BaseOption>): AllReturn {
  return Array.isArray(options)
    ? _fromList(options, options.length)
    : _fromIter(options);
}

export const asTuple = <T>(opt: Option<T>): [T] | [] =>
  opt.exists === true ? [opt.val] : [];
