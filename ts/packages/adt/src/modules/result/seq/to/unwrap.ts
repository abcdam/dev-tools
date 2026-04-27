import type { Result } from "../../primitive.js";

export const unwrapOr: <T2>(
  recover: T2,
) => <T1, E>(r: Result<T1, E>) => T1 | T2 = rec => r =>
  r.ok === true ? r.val : rec;

export const unwrapElse: <T2, E>(
  recoverFn: (err: E) => T2,
) => <T1>(r: Result<T1, E>) => T1 | T2 = recFn => r =>
  r.ok === true ? r.val : recFn(r.err);

export const unwrapErrOr: <T2>(
  recover: T2,
) => <T1, E>(r: Result<T1, E>) => E | T2 = rec => r =>
  r.ok === true ? rec : r.err;
export const unwrapErrElse: <T2>(
  recFn: () => T2,
) => <T1, E>(r: Result<T1, E>) => E | T2 = recFn => r =>
  r.ok === true ? recFn() : r.err;
