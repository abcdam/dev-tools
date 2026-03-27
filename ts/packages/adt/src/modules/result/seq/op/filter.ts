////////////////////////////////////////////////////////////
// ======    AUTO-GENERATED FILE. DO NOT EDIT.    ====== //
//////////////////////////////////////////////////////////

import { err, type Result } from "#result/primitive.js";
import type { GuardFn } from "#utility/guard.js";

export function filterOr<V, E, R1 extends V>(
  errValue: E,
  ...guards: [g1: GuardFn<V, R1>]
): (result: Result<V, E>) => Result<R1, E>;

export function filterOr<V, E, R1 extends V, R2 extends Exclude<V, R1>>(
  errValue: E,
  ...guards: [g1: GuardFn<V, R1>, g2: GuardFn<Exclude<V, R1>, R2>]
): (result: Result<V, E>) => Result<R1 | R2, E>;

export function filterOr<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
>(
  errValue: E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
  ]
): (result: Result<V, E>) => Result<R1 | R2 | R3, E>;

export function filterOr<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
>(
  errValue: E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
  ]
): (result: Result<V, E>) => Result<R1 | R2 | R3 | R4, E>;

export function filterOr<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
>(
  errValue: E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
  ]
): (result: Result<V, E>) => Result<R1 | R2 | R3 | R4 | R5, E>;

export function filterOr<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
  R6 extends Exclude<V, R1 | R2 | R3 | R4 | R5>,
>(
  errValue: E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
    g6: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5>, R6>,
  ]
): (result: Result<V, E>) => Result<R1 | R2 | R3 | R4 | R5 | R6, E>;

export function filterOr<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
  R6 extends Exclude<V, R1 | R2 | R3 | R4 | R5>,
  R7 extends Exclude<V, R1 | R2 | R3 | R4 | R5 | R6>,
>(
  errValue: E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
    g6: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5>, R6>,
    g7: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5 | R6>, R7>,
  ]
): (result: Result<V, E>) => Result<R1 | R2 | R3 | R4 | R5 | R6 | R7, E>;

export function filterOr<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
  R6 extends Exclude<V, R1 | R2 | R3 | R4 | R5>,
  R7 extends Exclude<V, R1 | R2 | R3 | R4 | R5 | R6>,
  R8 extends Exclude<V, R1 | R2 | R3 | R4 | R5 | R6 | R7>,
>(
  errValue: E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
    g6: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5>, R6>,
    g7: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5 | R6>, R7>,
    g8: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5 | R6 | R7>, R8>,
  ]
): (result: Result<V, E>) => Result<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8, E>;

export function filterOr<V, E>(
  errValue: E,
  ...predicates: Array<(input: V) => boolean>
): (result: Result<V, E>) => Result<V, E>;

export function filterOr(errValue: any, ...predicates: any[]) {
  return (result: any) => {
    if (result.ok === false) return result;
    const v = result.value;
    const limit = predicates.length;
    for (let i = 0; i < limit; i++) if (predicates[i](v)) return result;
    return err(errValue);
  };
}

export function filterElse<V, E, R1 extends V>(
  errFn: (input: V) => E,
  ...guards: [g1: GuardFn<V, R1>]
): (result: Result<V, E>) => Result<R1, E>;

export function filterElse<V, E, R1 extends V, R2 extends Exclude<V, R1>>(
  errFn: (input: V) => E,
  ...guards: [g1: GuardFn<V, R1>, g2: GuardFn<Exclude<V, R1>, R2>]
): (result: Result<V, E>) => Result<R1 | R2, E>;

export function filterElse<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
>(
  errFn: (input: V) => E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
  ]
): (result: Result<V, E>) => Result<R1 | R2 | R3, E>;

export function filterElse<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
>(
  errFn: (input: V) => E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
  ]
): (result: Result<V, E>) => Result<R1 | R2 | R3 | R4, E>;

export function filterElse<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
>(
  errFn: (input: V) => E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
  ]
): (result: Result<V, E>) => Result<R1 | R2 | R3 | R4 | R5, E>;

export function filterElse<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
  R6 extends Exclude<V, R1 | R2 | R3 | R4 | R5>,
>(
  errFn: (input: V) => E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
    g6: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5>, R6>,
  ]
): (result: Result<V, E>) => Result<R1 | R2 | R3 | R4 | R5 | R6, E>;

export function filterElse<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
  R6 extends Exclude<V, R1 | R2 | R3 | R4 | R5>,
  R7 extends Exclude<V, R1 | R2 | R3 | R4 | R5 | R6>,
>(
  errFn: (input: V) => E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
    g6: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5>, R6>,
    g7: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5 | R6>, R7>,
  ]
): (result: Result<V, E>) => Result<R1 | R2 | R3 | R4 | R5 | R6 | R7, E>;

export function filterElse<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
  R6 extends Exclude<V, R1 | R2 | R3 | R4 | R5>,
  R7 extends Exclude<V, R1 | R2 | R3 | R4 | R5 | R6>,
  R8 extends Exclude<V, R1 | R2 | R3 | R4 | R5 | R6 | R7>,
>(
  errFn: (input: V) => E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
    g6: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5>, R6>,
    g7: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5 | R6>, R7>,
    g8: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5 | R6 | R7>, R8>,
  ]
): (result: Result<V, E>) => Result<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8, E>;

export function filterElse<V, E>(
  errFn: (input: V) => E,
  ...predicates: Array<(input: V) => boolean>
): (result: Result<V, E>) => Result<V, E>;

export function filterElse(errFn: any, ...predicates: any[]) {
  return (result: any) => {
    if (result.ok === false) return result;
    const v = result.value;
    const limit = predicates.length;
    for (let i = 0; i < limit; i++) if (predicates[i](v)) return result;
    return err(errFn(v));
  };
}
