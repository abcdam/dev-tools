////////////////////////////////////////////////////////////
// ======    AUTO-GENERATED FILE. DO NOT EDIT.    ====== //
//////////////////////////////////////////////////////////

import { none, type Option, some } from "#option/primitive.js";
import type { GuardFn, PredicateFn } from "#utility/guard.js";

export function check<T, U1 extends T>(
  ...guards: [g1: GuardFn<T, U1>]
): (data: T) => Option<U1>;

export function check<T, U1 extends T, U2 extends Exclude<T, U1>>(
  ...guards: [g1: GuardFn<T, U1>, g2: GuardFn<Exclude<T, U1>, U2>]
): (data: T) => Option<U1 | U2>;

export function check<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
>(
  ...guards: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
  ]
): (data: T) => Option<U1 | U2 | U3>;

export function check<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
>(
  ...guards: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
  ]
): (data: T) => Option<U1 | U2 | U3 | U4>;

export function check<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
>(
  ...guards: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
  ]
): (data: T) => Option<U1 | U2 | U3 | U4 | U5>;

export function check<
  T,
  U1 extends T,
  U2 extends Exclude<T, U1>,
  U3 extends Exclude<T, U1 | U2>,
  U4 extends Exclude<T, U1 | U2 | U3>,
  U5 extends Exclude<T, U1 | U2 | U3 | U4>,
  U6 extends Exclude<T, U1 | U2 | U3 | U4 | U5>,
>(
  ...guards: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
  ]
): (data: T) => Option<U1 | U2 | U3 | U4 | U5 | U6>;

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
  ...guards: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
  ]
): (data: T) => Option<U1 | U2 | U3 | U4 | U5 | U6 | U7>;

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
  ...guards: [
    g1: GuardFn<T, U1>,
    g2: GuardFn<Exclude<T, U1>, U2>,
    g3: GuardFn<Exclude<T, U1 | U2>, U3>,
    g4: GuardFn<Exclude<T, U1 | U2 | U3>, U4>,
    g5: GuardFn<Exclude<T, U1 | U2 | U3 | U4>, U5>,
    g6: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5>, U6>,
    g7: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6>, U7>,
    g8: GuardFn<Exclude<T, U1 | U2 | U3 | U4 | U5 | U6 | U7>, U8>,
  ]
): (data: T) => Option<U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8>;

export function check<T>(
  ...predicates: [PredicateFn<T>, ...PredicateFn<T>[]]
): (data: T) => Option<T>;

export function check(...fns: any[]) {
  const limit = fns.length;
  return (data: any) => {
    for (let i = 0; i < limit; i++) if (fns[i](data)) return some(data);
    return none();
  };
}
