import type { Branch } from "@branch:core/types";
import { none, some } from "@option:core/primitives";
import { andPolicy, orPolicy } from "./operators.js";
import type { CachePolicy } from "./types.js";

type TtlSuccessMeta = [null, number];

type BackoffMeta = Branch<TtlSuccessMeta, number>;

export const onlyOkPolicy = <T, E>(): CachePolicy<T, E> => ({
  updateMetadata: (result) => (result.ok ? some(null) : none()),
  isFresh: (_) => true,
});

export const ttlPolicy = <T, E>(ttlMs: number): CachePolicy<T, E, number> => ({
  updateMetadata: (_) => some(Date.now()),
  isFresh: (timestamp) => Date.now() - timestamp < ttlMs,
});

export const alwaysPolicy = <T, E>(): CachePolicy<T, E> => ({
  updateMetadata: (_) => some(null),
  isFresh: (_) => true,
});

export const ttlSuccessPolicy = <T, E>(
  ttlMs: number,
): CachePolicy<T, E, TtlSuccessMeta> =>
  andPolicy(onlyOkPolicy(), ttlPolicy(ttlMs));

export const ttlErrorPolicy = <T, E>(
  ttlMs: number,
): CachePolicy<T, E, number> => ({
  updateMetadata: (result) => (!result.ok ? some(Date.now()) : none()),
  isFresh: (timestamp) => Date.now() - timestamp < ttlMs,
});

export const backoffSuccessPolicy = <T, E>(
  ttlOnSuccess: number,
  ttlOnError: number,
): CachePolicy<T, E, BackoffMeta> =>
  orPolicy(ttlSuccessPolicy(ttlOnSuccess), ttlErrorPolicy(ttlOnError));
