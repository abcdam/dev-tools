import { _NONE } from "#option/const.js";
import {
  type BaseOption,
  type InferSome,
  type InferSomes,
  type Option,
  some,
} from "#option/primitive.js";

type AllReturn = Option<unknown[]>;
const _fromList = (options: BaseOption[], limit: number): AllReturn => {
  const acc = [];
  for (let i = 0; i < limit; i++) {
    const option = options[i]!;
    if (option.exists) acc.push(option.val);
    else return _NONE;
  }
  return some(acc);
};
const _fromIter = (options: Iterable<BaseOption>): AllReturn => {
  const acc = [];
  for (const option of options)
    if (option.exists) acc.push(option.val);
    else return _NONE;
  return some(acc);
};

export function all<const T extends readonly BaseOption[]>(
  options: T,
): Option<InferSomes<T>>;

export function all<U extends BaseOption>(
  options: Iterable<U>,
): Option<InferSome<U>[]>;

export function all(options: any): AllReturn {
  return Array.isArray(options)
    ? _fromList(options, options.length)
    : _fromIter(options);
}
