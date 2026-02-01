/** biome-ignore-all lint/suspicious/noExplicitAny: <is already covered by signature> */
import type { Seq, SeqAsync } from "./types.js";

export const seq: Seq = (initialValue: any, ...fns: any[]): any => {
  let acc = initialValue;
  for (let i = 0; i < fns.length; i++) acc = fns[i](acc);
  return acc;
};

/**
 *
 * This is a somewhat raw but performant implementation of an async pipeline
 * that processes input synchronously until the first promise is encountered.
 *
 * **IMPORTANT**
 * It is the responsibility of the consumer to ensure:
 * * **Error Management:** strictly avoid throwable side-effects (use e.g. `Result<T,E>`)
 * * **Non-Nullable Values:** Values must never be `null` or `undefined` (use e.g. `Option<T>`)
 *
 * > Ignoring these measures will lead to sweat and tears.
 *
 * @param initialValue
 * @param fns curried operators to apply in sequence.
 * @returns a promise that resolves to the final output value
 */
export const seqAsync: SeqAsync = (initialValue: any, ...fns: any[]): any => {
  let acc = initialValue;
  for (let i = 0; i < fns.length; i++)
    acc =
      acc instanceof Promise || typeof (acc as any).then === "function"
        ? acc.then(fns[i])
        : fns[i](acc);
  return Promise.resolve(acc);
};
