////////////////////////////////////////////////////////////
// ======    AUTO-GENERATED FILE. DO NOT EDIT.    ====== //
//////////////////////////////////////////////////////////

// biome-ignore-all assist/source/organizeImports: haltsmaul

import type { Option, OptionBase } from "#option/primitive.js";
import { _NONE } from "#option/construct.internal.js";
import type { OperGuard, OperPredicate } from "#utility/types/oper.js";

export function filter<T, U1 extends T>(
  ...guards: [g1: OperGuard<T, U1>]
): (option: Option<T>) => Option<U1>;

export function filter<T, U1 extends T, U2 extends Exclude<T, U1>>(
  ...guards: [g1: OperGuard<T, U1>, g2: OperGuard<Exclude<T, U1>, U2>]
): (option: Option<T>) => Option<U1 | U2>;

export function filter<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
>(
  ...guards: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
  ]
): (option: Option<T>) => Option<U1 | U2 | U3>;

export function filter<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
>(
  ...guards: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
  ]
): (option: Option<T>) => Option<U1 | U2 | U3 | U4>;

export function filter<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
>(
  ...guards: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
  ]
): (option: Option<T>) => Option<U1 | U2 | U3 | U4 | U5>;

export function filter<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
>(
  ...guards: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
  ]
): (option: Option<T>) => Option<U1 | U2 | U3 | U4 | U5 | U6>;

export function filter<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
  U7 extends Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>,
>(
  ...guards: [
    g1: OperGuard<T, U1>,
    g2: OperGuard<Exclude<T, U1>, U2>,
    g3: OperGuard<Exclude<T, U1 | U2>, U3>,
    g4: OperGuard<Exclude<T, U1 | U2 | U3>, U4>,
    g5: OperGuard<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: OperGuard<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
  ]
): (option: Option<T>) => Option<U1 | U2 | U3 | U4 | U5 | U6 | U7>;

export function filter<
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
): (option: Option<T>) => Option<U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8>;

export function filter<T>(
  ...predicates: [OperPredicate<T>, ...OperPredicate<T>[]]
): (option: Option<T>) => Option<T>;

export function filter(...fns: any[]) {
  const limit = fns.length;
  return (option: OptionBase) => {
    if (option.exists === false) return option;
    const v = option.val;
    for (let i = 0; i < limit; i++) if (fns[i](v)) return option;
    return _NONE;
  };
}
