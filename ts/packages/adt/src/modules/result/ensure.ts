import { _toJSON, type ResultProto } from "./construct.internal.js";
import { type BaseResult, err, ok, type Result } from "./primitive.js";

/**
 * #### What:
 *
 * An optimistic structural validator & rehydrator  at boundary entry. Returns instance (`Result<T,E | EFallback>`: `on shape`):
 * - `Ok<T>`: `{val: unknown; err?: unknown; ok?: true | undefined}`
 * - `Err<E>`: {`val?: unknown; err: unknown; ok?: false | undefined}`
 * - `Err<EFallback>`: anything else
 *
 * #### Use case:
 * - First measure in a validation pipeline for Results
 * - Rescuing malformed result pojos where shape intent is clear but the discriminator is missing
 *
 * #### Notes:
 * - For performance-critical use cases, keep V8 happy by rehydrating result pojos as early as possible
 */
export function ensureResult<EFallback, T = unknown, E = unknown>(
  input: unknown,
  fallback: EFallback,
): Result<T, E | EFallback>;
export function ensureResult(input: unknown, fallback: unknown): BaseResult {
  if (typeof input !== "object" || input === null) return err(fallback);
  const r = input as { ok?: unknown; err?: unknown; val?: unknown };
  const okk = r.ok;

  // optimistic assumption: if `val` prop is available but `ok` is missing,
  // we assume it is an `Ok<T>` that lost its discriminator during unhandled "pojofication"
  // -> vice versa for Err<E>
  // biome-ignore format: readability
  return "val" in r && (okk === true || okk === void 0)
    ? ok(r.val)
      : "err" in r && (okk === false || okk === void 0)
      ? err(r.err)
    : err(fallback);
}

/**
 * #### What:
 *
 * Escape hatch when working with structural cloning at boundery exit
 * - dehydrates optimized `Option<T>` into an equivalent plain old javascript object
 *
 * #### Why:
 * - To keep the GC happy, the`exists` discriminator lives on the prototype of `Option<T>` and
 * is shared among all instances of the same type.
 * - depending on implementation, structural cloning (e.g. `structuredClone()`) drops properties not owned by the instance
 *
 * #### Notes:
 * - Calling this function during `JSON.stringify`-based serialization is redundant, as this "pojofication" is  already handled
 * - For performance-critical use cases, keep V8 happy by dehydrating option pojos as late as possible
 */
export const ensureResultPojo = <T, E>(r: Result<T, E>): Result<T, E> => {
  const fn = (r as unknown as ResultProto<Result<T, E>>).toJSON;
  return fn === _toJSON ? fn.call(r) : r;
};
