import {
  someOr as someOrCore,
  someOrElse as someOrElseCore,
} from "@option:core/operators/unwrap";
import type { Option } from "@option:core/types";
export const someOr =
  <D>(fallback: D) =>
  // Beautify: Collapse locked D into T if fallback is a subtype. Tsc is lazy and needs a poke (T[] | [] => T[])
  <T>(opt: Option<T>): T | (D extends T ? never : D) =>
    someOrCore(opt, fallback) as T | (D extends T ? never : D);

export const someOrElse =
  <D>(fallbackFn: () => D) =>
  <T>(opt: Option<T>): T | (D extends T ? never : D) =>
    someOrElseCore(opt, fallbackFn) as T | (D extends T ? never : D);
