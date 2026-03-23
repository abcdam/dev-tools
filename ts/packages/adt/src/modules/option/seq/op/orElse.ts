import type { Option, Some } from "../../primitive.js";
export const orElse =
  <T2>(recoverFn: () => Option<T2>) =>
  <T1>(opt: Option<T1>): Option<T1 | T2> =>
    opt.exists === true ? opt : recoverFn();

export const orElseAsync =
  <T1, T2 = T1>(recoverFn: () => Promise<Option<T2>>) =>
  (opt: Option<T1>): Promise<Option<T1 | T2>> =>
    opt.exists === true ? Promise.resolve(opt) : recoverFn();

/**
 * This function does NOT return a promise whe option is of type Some<T>. this is useful in
 * async sequences to avoid early promise poisoning
 * @param opt
 * @param recoverFn
 * @returns a promise in the `else` case or the option itself as a non-promise.
 */
export const orElseAsync_Fast =
  <T1, T2 = T1>(recoverFn: () => Promise<Option<T2>>) =>
  (opt: Option<T1>): Promise<Option<T1 | T2>> =>
    opt.exists === true ? (opt as unknown as Promise<Some<T1>>) : recoverFn();
