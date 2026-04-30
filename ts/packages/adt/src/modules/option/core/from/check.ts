////////////////////////////////////////////////////////////
// ======    AUTO-GENERATED FILE. DO NOT EDIT.    ====== //
//////////////////////////////////////////////////////////

// biome-ignore-all assist/source/organizeImports: haltsmaul

import { some } from "#option/primitive.js";
import type { Option, OptionBase } from "#option/primitive.js";
import { _NONE } from "#option/construct.internal.js";
import type { OperGuard, OperPredicate } from "#utility/types/oper.js";

export function check<T, U1 extends T>(
  data: T,
  ...guards: [g1: OperGuard<T, U1>]
): Option<U1>;

export function check<T, U1 extends T, U2 extends Exclude<T, U1>>(
  data: T,
  ...guards: [g1: OperGuard<T, U1>, g2: OperGuard<Exclude<T, U1>, U2>]
): Option<U1 | U2>;

export function check<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
>(
  data: T,
  ...guards: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
  ]
): Option<U1 | U2 | U3>;

export function check<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
>(
  data: T,
  ...guards: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
  ]
): Option<U1 | U2 | U3 | U4>;

export function check<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
>(
  data: T,
  ...guards: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
  ]
): Option<U1 | U2 | U3 | U4 | U5>;

export function check<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
>(
  data: T,
  ...guards: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
  ]
): Option<U1 | U2 | U3 | U4 | U5 | U6>;

export function check<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
  U7 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>,
>(
  data: T,
  ...guards: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
  ]
): Option<U1 | U2 | U3 | U4 | U5 | U6 | U7>;

export function check<
  T,
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
  ...guards: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    g8: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6 | U7>, U8>,
  ]
): Option<U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8>;

export function check<T>(
  data: T,
  ...predicates: [OperPredicate<T>, ...OperPredicate<T>[]]
): Option<T>;

export function check(data: OptionBase, ...fns: any[]) {
  const limit = fns.length;
  for (let i = 0; i < limit; i++) if (fns[i](data)) return some(data);
  return _NONE;
}
