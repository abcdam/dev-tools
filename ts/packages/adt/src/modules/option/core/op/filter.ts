////////////////////////////////////////////////////////////
// ======    AUTO-GENERATED FILE. DO NOT EDIT.    ====== //
//////////////////////////////////////////////////////////

import { none, type Option } from "#option/primitive.js";
import type { GuardFn } from "#utility/guard.js";

export function filter<V, R1 extends V>(
  option: Option<V>,
  ...guards: [g1: GuardFn<V, R1>]
): Option<R1>;

export function filter<V, R1 extends V, R2 extends Exclude<V, R1>>(
  option: Option<V>,
  ...guards: [g1: GuardFn<V, R1>, g2: GuardFn<Exclude<V, R1>, R2>]
): Option<R1 | R2>;

export function filter<
  V,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
>(
  option: Option<V>,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
  ]
): Option<R1 | R2 | R3>;

export function filter<
  V,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
>(
  option: Option<V>,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
  ]
): Option<R1 | R2 | R3 | R4>;

export function filter<
  V,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
>(
  option: Option<V>,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
  ]
): Option<R1 | R2 | R3 | R4 | R5>;

export function filter<
  V,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
  R6 extends Exclude<V, R1 | R2 | R3 | R4 | R5>,
>(
  option: Option<V>,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
    g6: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5>, R6>,
  ]
): Option<R1 | R2 | R3 | R4 | R5 | R6>;

export function filter<
  V,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
  R6 extends Exclude<V, R1 | R2 | R3 | R4 | R5>,
  R7 extends Exclude<V, R1 | R2 | R3 | R4 | R5 | R6>,
>(
  option: Option<V>,
  ...guards: [
    g1: GuardFn<V, R1>,
    g2: GuardFn<Exclude<V, R1>, R2>,
    g3: GuardFn<Exclude<V, R1 | R2>, R3>,
    g4: GuardFn<Exclude<V, R1 | R2 | R3>, R4>,
    g5: GuardFn<Exclude<V, R1 | R2 | R3 | R4>, R5>,
    g6: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5>, R6>,
    g7: GuardFn<Exclude<V, R1 | R2 | R3 | R4 | R5 | R6>, R7>,
  ]
): Option<R1 | R2 | R3 | R4 | R5 | R6 | R7>;

export function filter<
  V,
  R1 extends V,
  R2 extends Exclude<V, R1>,
  R3 extends Exclude<V, R1 | R2>,
  R4 extends Exclude<V, R1 | R2 | R3>,
  R5 extends Exclude<V, R1 | R2 | R3 | R4>,
  R6 extends Exclude<V, R1 | R2 | R3 | R4 | R5>,
  R7 extends Exclude<V, R1 | R2 | R3 | R4 | R5 | R6>,
  R8 extends Exclude<V, R1 | R2 | R3 | R4 | R5 | R6 | R7>,
>(
  option: Option<V>,
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
): Option<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8>;

export function filter<V>(
  option: Option<V>,
  ...predicates: Array<(input: V) => boolean>
): Option<V>;

export function filter(option: any, ...predicates: any[]) {
  if (option.exists === false) return option;
  const v = option.value;
  const limit = predicates.length;
  for (let i = 0; i < limit; i++) if (predicates[i](v)) return option;
  return none();
}
