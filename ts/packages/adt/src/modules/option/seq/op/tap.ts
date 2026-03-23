import type { Option } from "../../primitive.js";
export const tap =
  <T>(tapFn: (someValue: T) => void) =>
  (opt: Option<T>): Option<T> => {
    opt.exists === true && tapFn(opt.value);
    return opt;
  };

export const tapNone =
  (tapFn: () => void) =>
  <T>(opt: Option<T>): Option<T> => {
    opt.exists === false && tapFn();
    return opt;
  };

export const tapAsync =
  <T>(tapFn: (someValue: T) => Promise<void>) =>
  async (opt: Option<T>): Promise<Option<T>> => {
    opt.exists === true && (await tapFn(opt.value));
    return opt;
  };
export const tapNoneAsync =
  <T>(tapFn: () => Promise<void>) =>
  async (opt: Option<T>): Promise<Option<T>> => {
    opt.exists === false && (await tapFn());
    return opt;
  };
