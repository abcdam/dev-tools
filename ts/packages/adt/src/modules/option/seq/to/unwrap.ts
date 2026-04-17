import type { Option } from "../../primitive.js";

// Beautify: Collapse locked D into T if fallback is a subtype. Tsc is lazy and needs a poke (T[] | [] => T[])
type Normalized<T, V> = T | (V extends T ? never : V);
export const unwrapOr: <V>(
  recover: V,
) => <T>(o: Option<T>) => Normalized<T, V> = rec => opt =>
  opt.exists === true ? opt.val : (rec as any);

export const unwrapElse: <V>(
  recoverFn: () => V,
) => <T>(o: Option<T>) => Normalized<T, V> = recFn => opt =>
  opt.exists === true ? opt.val : (recFn() as any);
