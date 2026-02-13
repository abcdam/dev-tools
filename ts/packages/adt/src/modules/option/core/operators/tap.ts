import type { Option } from "@option:core/types";

export const tap = <T>(
  opt: Option<T>,
  tapFn: (someValue: T) => void,
): Option<T> => {
  if (opt.exists) tapFn(opt.value);
  return opt;
};

export const tapNone = <T>(opt: Option<T>, tapFn: () => void): Option<T> => {
  if (!opt.exists) tapFn();
  return opt;
};

export const tapAsync = async <T>(
  opt: Option<T>,
  tapFn: (someValue: T) => Promise<void>,
): Promise<Option<T>> => {
  if (opt.exists) await tapFn(opt.value);
  return opt;
};

export const tapNoneAsync = async <T>(
  opt: Option<T>,
  tapFn: () => Promise<void>,
): Promise<Option<T>> => {
  if (!opt.exists) await tapFn();
  return opt;
};
