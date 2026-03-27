////////////////////////////////////////////////////////////
// ======    AUTO-GENERATED FILE. DO NOT EDIT.    ====== //
//////////////////////////////////////////////////////////

import { ok, err, type Result } from "#result/primitive.js";
import type { GuardFn } from "#utility/guard.js";

export function checkOr<V, E, R1 extends V>(
  input: V,
  errValue: E,
  ...guards: [g1: GuardFn<V, R1>]
): Result<R1, E>;

export function checkOr<V, E, R1 extends V, R2 extends Exclude<V, R1>>(
  input: V,
  errValue: E,
  ...guards: [g1: GuardFn<V, R1>, g2: GuardFn<Exclude<V, R1>, R2>]
): Result<R1 | R2, E>;

export function checkOr<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
>(
  input: V,
  errValue: E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
  ]
): Result<R1 | R2 | R3, E>;

export function checkOr<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
>(
  input: V,
  errValue: E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
  ]
): Result<R1 | R2 | R3 | R4, E>;

export function checkOr<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
>(
  input: V,
  errValue: E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
  ]
): Result<R1 | R2 | R3 | R4 | R5, E>;

export function checkOr<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
  R6 extends Exclude<V, R1 | R2 | R3 | R4 | R5>,
>(
  input: V,
  errValue: E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
    g6: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5>, R6>,
  ]
): Result<R1 | R2 | R3 | R4 | R5 | R6, E>;

export function checkOr<
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
  input: V,
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
): Result<R1 | R2 | R3 | R4 | R5 | R6 | R7, E>;

export function checkOr<
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
  input: V,
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
): Result<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8, E>;

export function checkOr<V, E>(
  input: V,
  errValue: E,
  ...predicates: Array<(input: V) => boolean>
): Result<V, E>;

export function checkOr(input: any, errValue: any, ...predicates: any[]) {
  const limit = predicates.length;
  for (let i = 0; i < limit; i++) if (predicates[i](input)) return ok(input);
  return err(errValue);
}

export function checkElse<V, E, R1 extends V>(
  input: V,
  errFn: (input: V) => E,
  ...guards: [g1: GuardFn<V, R1>]
): Result<R1, E>;

export function checkElse<V, E, R1 extends V, R2 extends Exclude<V, R1>>(
  input: V,
  errFn: (input: V) => E,
  ...guards: [g1: GuardFn<V, R1>, g2: GuardFn<Exclude<V, R1>, R2>]
): Result<R1 | R2, E>;

export function checkElse<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
>(
  input: V,
  errFn: (input: V) => E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
  ]
): Result<R1 | R2 | R3, E>;

export function checkElse<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
>(
  input: V,
  errFn: (input: V) => E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
  ]
): Result<R1 | R2 | R3 | R4, E>;

export function checkElse<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
>(
  input: V,
  errFn: (input: V) => E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
  ]
): Result<R1 | R2 | R3 | R4 | R5, E>;

export function checkElse<
  V,
  E,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
  R6 extends Exclude<V, R1 | R2 | R3 | R4 | R5>,
>(
  input: V,
  errFn: (input: V) => E,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
    g6: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5>, R6>,
  ]
): Result<R1 | R2 | R3 | R4 | R5 | R6, E>;

export function checkElse<
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
  input: V,
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
): Result<R1 | R2 | R3 | R4 | R5 | R6 | R7, E>;

export function checkElse<
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
  input: V,
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
): Result<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8, E>;

export function checkElse<V, E>(
  input: V,
  errFn: (input: V) => E,
  ...predicates: Array<(input: V) => boolean>
): Result<V, E>;

export function checkElse(input: any, errFn: any, ...predicates: any[]) {
  const limit = predicates.length;
  for (let i = 0; i < limit; i++) if (predicates[i](input)) return ok(input);
  return err(errFn(input));
}
