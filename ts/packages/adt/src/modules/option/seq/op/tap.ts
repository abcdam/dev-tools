import type { Option } from "../../primitive.js";
export const tap: <T>(
  tapFn: (inner: T) => void,
) => (o: Option<T>) => Option<T> = tapFn => opt => {
  if (opt.exists === true) tapFn(opt.val);
  return opt;
};
export const tapNone: (tapFn: () => void) => <T>(o: Option<T>) => Option<T> =
  tapFn => opt => {
    if (opt.exists === false) tapFn();
    return opt;
  };

export const tapAsync: <T>(
  tapFn: (inner: T) => Promise<void>,
) => (o: Option<T>) => Promise<Option<T>> = tapFn => async opt => {
  if (opt.exists === true) await tapFn(opt.val);
  return opt;
};
export const tapNoneAsync: <T>(
  tapFn: () => Promise<void>,
) => (o: Option<T>) => Promise<Option<T>> = tapFn => async opt => {
  if (opt.exists === false) await tapFn();
  return opt;
};
