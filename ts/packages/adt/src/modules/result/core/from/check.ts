////////////////////////////////////////////////////////////
// ======    AUTO-GENERATED FILE. DO NOT EDIT.    ====== //
//////////////////////////////////////////////////////////

// biome-ignore-all assist/source/organizeImports: haltsmaul

import { ok, err, type Result, type BaseResult } from "#result/primitive.js";
import type { GuardFn, PredicateFn } from "#utility/guard/index.js";

export function checkOr<T, E, U1 extends T>(
  data: T,
  ...guardsWithErrFallback: [g1: GuardFn<T, U1>, errValue: E]
): Result<U1, E>;

export function checkOr<T, E, U1 extends T, U2 extends Exclude<T, U1>>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    errValue: E,
  ]
): Result<U1 | U2, E>;

export function checkOr<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    errValue: E,
  ]
): Result<U1 | U2 | U3, E>;

export function checkOr<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    errValue: E,
  ]
): Result<U1 | U2 | U3 | U4, E>;

export function checkOr<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    errValue: E,
  ]
): Result<U1 | U2 | U3 | U4 | U5, E>;

export function checkOr<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    errValue: E,
  ]
): Result<U1 | U2 | U3 | U4 | U5 | U6, E>;

export function checkOr<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
  U7 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>,
>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    errValue: E,
  ]
): Result<U1 | U2 | U3 | U4 | U5 | U6 | U7, E>;

export function checkOr<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
  U7 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>,
  U8 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6 | U7>,
>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    g8: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6 | U7>, U8>,
    errValue: E,
  ]
): Result<U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8, E>;

export function checkOr<T, E>(
  data: T,
  ...predicatesWithErrFallback: [
    PredicateFn<T>,
    ...PredicateFn<T>[],
    errValue: E,
  ]
): Result<T, E>;

export function checkOr(data: BaseResult, ...fnsWithErrFallback: any[]) {
  const errValue = fnsWithErrFallback.pop();
  const limit = fnsWithErrFallback.length;
  for (let i = 0; i < limit; i++)
    if (fnsWithErrFallback[i](data)) return ok(data);
  return err(errValue);
}

export function checkElse<T, E, U1 extends T>(
  data: T,
  ...guardsWithErrFallback: [g1: GuardFn<T, U1>, errFn: (data: T) => E]
): Result<U1, E>;

export function checkElse<T, E, U1 extends T, U2 extends Exclude<T, U1>>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    errFn: (data: T) => E,
  ]
): Result<U1 | U2, E>;

export function checkElse<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    errFn: (data: T) => E,
  ]
): Result<U1 | U2 | U3, E>;

export function checkElse<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    errFn: (data: T) => E,
  ]
): Result<U1 | U2 | U3 | U4, E>;

export function checkElse<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    errFn: (data: T) => E,
  ]
): Result<U1 | U2 | U3 | U4 | U5, E>;

export function checkElse<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    errFn: (data: T) => E,
  ]
): Result<U1 | U2 | U3 | U4 | U5 | U6, E>;

export function checkElse<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
  U7 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>,
>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    errFn: (data: T) => E,
  ]
): Result<U1 | U2 | U3 | U4 | U5 | U6 | U7, E>;

export function checkElse<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
  U7 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>,
  U8 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6 | U7>,
>(
  data: T,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    g8: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6 | U7>, U8>,
    errFn: (data: T) => E,
  ]
): Result<U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8, E>;

export function checkElse<T, E>(
  data: T,
  ...predicatesWithErrFallback: [
    PredicateFn<T>,
    ...PredicateFn<T>[],
    errFn: (data: T) => E,
  ]
): Result<T, E>;

export function checkElse(data: BaseResult, ...fnsWithErrFallback: any[]) {
  const errFn = fnsWithErrFallback.pop();
  const limit = fnsWithErrFallback.length;
  for (let i = 0; i < limit; i++)
    if (fnsWithErrFallback[i](data)) return ok(data);
  return err(errFn(data));
}
