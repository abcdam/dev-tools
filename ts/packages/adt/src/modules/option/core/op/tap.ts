import type { Option } from "../../primitive.js";

export const tap = <T>(
  opt: Option<T>,
  tapFn: (someValue: T) => void,
): Option<T> => {
  opt.exists === true && tapFn(opt.value);
  return opt;
};

export const tapNone = <T>(opt: Option<T>, tapFn: () => void): Option<T> => {
  opt.exists === false && tapFn();
  return opt;
};

export const tapAsync = async <T>(
  opt: Option<T>,
  tapFn: (someValue: T) => Promise<void>,
): Promise<Option<T>> => {
  opt.exists === true && (await tapFn(opt.value));
  return opt;
};

export const tapNoneAsync = async <T>(
  opt: Option<T>,
  tapFn: () => Promise<void>,
): Promise<Option<T>> => {
  opt.exists === false && (await tapFn());
  return opt;
};
