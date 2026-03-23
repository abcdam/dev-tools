import type { Option } from "../../primitive.js";

export const unwrapOr =
  <D>(fallback: D) =>
  // Beautify: Collapse locked D into T if fallback is a subtype. Tsc is lazy and needs a poke (T[] | [] => T[])
  <T>(opt: Option<T>): T | (D extends T ? never : D) =>
    (opt.exists === true ? opt.value : fallback) as
      | T
      | (D extends T ? never : D);

export const unwrapElse =
  <D>(fallbackFn: () => D) =>
  <T>(opt: Option<T>): T | (D extends T ? never : D) =>
    (opt.exists === true ? opt.value : fallbackFn()) as
      | T
      | (D extends T ? never : D);
