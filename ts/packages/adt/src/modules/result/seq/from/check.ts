////////////////////////////////////////////////////////////
// ======    AUTO-GENERATED FILE. DO NOT EDIT.    ====== //
//////////////////////////////////////////////////////////

// biome-ignore-all assist/source/organizeImports: haltsmaul

import { ok, err, type Result, type ResultBase } from "#result/primitive.js";
import type { OperGuard, OperPredicate } from "#utility/types/oper.js";

export function checkOr<T, E, U1 extends T>(
  ...guardsWithErrFallback: [g1: OperGuard<T, U1>, errValue: E]
): (data: T) => Result<U1, E>;

export function checkOr<T, E, U1 extends T, U2 extends Exclude<T, U1>>(
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    errValue: E,
  ]
): (data: T) => Result<U1 | U2, E>;

export function checkOr<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
>(
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    errValue: E,
  ]
): (data: T) => Result<U1 | U2 | U3, E>;

export function checkOr<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
>(
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    errValue: E,
  ]
): (data: T) => Result<U1 | U2 | U3 | U4, E>;

export function checkOr<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
>(
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    errValue: E,
  ]
): (data: T) => Result<U1 | U2 | U3 | U4 | U5, E>;

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
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    errValue: E,
  ]
): (data: T) => Result<U1 | U2 | U3 | U4 | U5 | U6, E>;

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
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    errValue: E,
  ]
): (data: T) => Result<U1 | U2 | U3 | U4 | U5 | U6 | U7, E>;

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
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    g8: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6 | U7>, U8>,
    errValue: E,
  ]
): (data: T) => Result<U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8, E>;

export function checkOr<T, E>(
  ...predicatesWithErrFallback: [
    OperPredicate<T>,
    ...OperPredicate<T>[],
    errValue: E,
  ]
): (data: T) => Result<T, E>;

export function checkOr(...fnsWithErrFallback: any[]) {
  const errValue = fnsWithErrFallback.pop();
  const limit = fnsWithErrFallback.length;
  return (data: ResultBase) => {
    for (let i = 0; i < limit; i++)
      if (fnsWithErrFallback[i](data)) return ok(data);
    return err(errValue);
  };
}

export function checkElse<T, E, U1 extends T>(
  ...guardsWithErrFallback: [g1: OperGuard<T, U1>, errFn: (data: T) => E]
): (data: T) => Result<U1, E>;

export function checkElse<T, E, U1 extends T, U2 extends Exclude<T, U1>>(
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    errFn: (data: T) => E,
  ]
): (data: T) => Result<U1 | U2, E>;

export function checkElse<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
>(
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    errFn: (data: T) => E,
  ]
): (data: T) => Result<U1 | U2 | U3, E>;

export function checkElse<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
>(
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    errFn: (data: T) => E,
  ]
): (data: T) => Result<U1 | U2 | U3 | U4, E>;

export function checkElse<
  T,
  E,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
>(
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    errFn: (data: T) => E,
  ]
): (data: T) => Result<U1 | U2 | U3 | U4 | U5, E>;

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
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    errFn: (data: T) => E,
  ]
): (data: T) => Result<U1 | U2 | U3 | U4 | U5 | U6, E>;

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
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    errFn: (data: T) => E,
  ]
): (data: T) => Result<U1 | U2 | U3 | U4 | U5 | U6 | U7, E>;

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
  ...guardsWithErrFallback: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    g8: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6 | U7>, U8>,
    errFn: (data: T) => E,
  ]
): (data: T) => Result<U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8, E>;

export function checkElse<T, E>(
  ...predicatesWithErrFallback: [
    OperPredicate<T>,
    ...OperPredicate<T>[],
    errFn: (data: T) => E,
  ]
): (data: T) => Result<T, E>;

export function checkElse(...fnsWithErrFallback: any[]) {
  const errFn = fnsWithErrFallback.pop();
  const limit = fnsWithErrFallback.length;
  return (data: ResultBase) => {
    for (let i = 0; i < limit; i++)
      if (fnsWithErrFallback[i](data)) return ok(data);
    return err(errFn(data));
  };
}
