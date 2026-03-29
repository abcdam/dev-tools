////////////////////////////////////////////////////////////
// ======    AUTO-GENERATED FILE. DO NOT EDIT.    ====== //
//////////////////////////////////////////////////////////

import { err, type Result } from "#result/primitive.js";
import type { GuardFn, PredicateFn } from "#utility/guard.js";

export function filterOr<T, E1, E2, U1 extends T>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [g1: GuardFn<T, U1>, errValue: E2]
): Result<U1, E1 | E2>;

export function filterOr<T, E1, E2, U1 extends T, U2 extends Exclude<T, U1>>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    errValue: E2,
  ]
): Result<U1 | U2, E1 | E2>;

export function filterOr<
  T,
  E1,
  E2,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    errValue: E2,
  ]
): Result<U1 | U2 | U3, E1 | E2>;

export function filterOr<
  T,
  E1,
  E2,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    errValue: E2,
  ]
): Result<U1 | U2 | U3 | U4, E1 | E2>;

export function filterOr<
  T,
  E1,
  E2,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    errValue: E2,
  ]
): Result<U1 | U2 | U3 | U4 | U5, E1 | E2>;

export function filterOr<
  T,
  E1,
  E2,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    errValue: E2,
  ]
): Result<U1 | U2 | U3 | U4 | U5 | U6, E1 | E2>;

export function filterOr<
  T,
  E1,
  E2,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
  U7 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>,
>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    errValue: E2,
  ]
): Result<U1 | U2 | U3 | U4 | U5 | U6 | U7, E1 | E2>;

export function filterOr<
  T,
  E1,
  E2,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
  U7 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>,
  U8 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6 | U7>,
>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    g8: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6 | U7>, U8>,
    errValue: E2,
  ]
): Result<U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8, E1 | E2>;

export function filterOr<T, E1, E2>(
  result: Result<T, E1>,
  ...predicatesWithErrFallback: [
    PredicateFn<T>,
    ...PredicateFn<T>[],
    errValue: E2,
  ]
): Result<T, E1 | E2>;

export function filterOr(result: any, ...fnsWithErrFallback: any[]) {
  if (result.ok === false) return result;
  const v = result.value;
  const errValue = fnsWithErrFallback.pop();
  const limit = fnsWithErrFallback.length;
  for (let i = 0; i < limit; i++) if (fnsWithErrFallback[i](v)) return result;
  return err(errValue);
}

export function filterElse<T, E1, E2, U1 extends T>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [g1: GuardFn<T, U1>, errFn: (data: T) => E2]
): Result<U1, E1 | E2>;

export function filterElse<T, E1, E2, U1 extends T, U2 extends Exclude<T, U1>>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    errFn: (data: T) => E2,
  ]
): Result<U1 | U2, E1 | E2>;

export function filterElse<
  T,
  E1,
  E2,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    errFn: (data: T) => E2,
  ]
): Result<U1 | U2 | U3, E1 | E2>;

export function filterElse<
  T,
  E1,
  E2,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    errFn: (data: T) => E2,
  ]
): Result<U1 | U2 | U3 | U4, E1 | E2>;

export function filterElse<
  T,
  E1,
  E2,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    errFn: (data: T) => E2,
  ]
): Result<U1 | U2 | U3 | U4 | U5, E1 | E2>;

export function filterElse<
  T,
  E1,
  E2,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    errFn: (data: T) => E2,
  ]
): Result<U1 | U2 | U3 | U4 | U5 | U6, E1 | E2>;

export function filterElse<
  T,
  E1,
  E2,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
  U7 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>,
>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    errFn: (data: T) => E2,
  ]
): Result<U1 | U2 | U3 | U4 | U5 | U6 | U7, E1 | E2>;

export function filterElse<
  T,
  E1,
  E2,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
  U7 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>,
  U8 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6 | U7>,
>(
  result: Result<T, E1>,
  ...guardsWithErrFallback: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    g8: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6 | U7>, U8>,
    errFn: (data: T) => E2,
  ]
): Result<U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8, E1 | E2>;

export function filterElse<T, E1, E2>(
  result: Result<T, E1>,
  ...predicatesWithErrFallback: [
    PredicateFn<T>,
    ...PredicateFn<T>[],
    errFn: (data: T) => E2,
  ]
): Result<T, E1 | E2>;

export function filterElse(result: any, ...fnsWithErrFallback: any[]) {
  if (result.ok === false) return result;
  const v = result.value;
  const errFn = fnsWithErrFallback.pop();
  const limit = fnsWithErrFallback.length;
  for (let i = 0; i < limit; i++) if (fnsWithErrFallback[i](v)) return result;
  return err(errFn(v));
}
