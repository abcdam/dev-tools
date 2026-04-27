import type { OptionProto } from "./construct.internal.js";
import { _NONE, _toJSON } from "./construct.internal.js";
import { type BaseOption, type Option, some } from "./primitive.js";

/**
 * #### What:
 *
 * An optimistic structural validator & rehydrator at boundery entry. Returns instance (`Ok<T>`: `on shape`):
 * - `Some<T>`: `{val: unknown; exists?: true}`
 * - Anything else: `None` is returned
 *
 * #### Use case:
 * - first measure in a validation pipeline where the input is unknown
 * - Rescuing malformed objects where shape intent is clear but the discriminator is missing
 *
 * #### Notes:
 * - For performance-critical use cases, keep V8 happy by rehydrating option pojos as early as possible
 */
export function ensureOption<T = unknown>(input: unknown): Option<T>;
export function ensureOption(input: unknown): BaseOption {
  if (typeof input !== "object" || input === null) return _NONE;
  const o = input as { exists?: unknown; val?: unknown };
  // biome-ignore format: readability
  return "val" in o
        && // optimistic assumption: if `val` prop is available but `exists` is missing,
        // we assume it is a `Some<T>` that lost its discriminator during unhandled "pojofication"
        (o.exists === true || o.exists === void 0)
    ? some(o.val)
    : _NONE;
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
export const ensureOptionPojo = <T>(o: Option<T>): Option<T> => {
  const fn = (o as OptionProto<Option<T>>).toJSON;
  return fn === _toJSON ? fn.call(o) : o;
};
