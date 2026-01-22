import { isPromise } from "@internal/index";
import type { Awaitable } from "@internal/types";
import type { Result } from "@result/types";
import type { CachePolicy } from "./types";

type Cache<T, E, Metadata> = {
  result: Result<T, E>;
  metadata: Metadata;
};

const createPolicedCache = <T, E, Metadata>(
  policy: CachePolicy<T, E, Metadata>,
) => {
  let cached: Cache<T, E, Metadata>;
  const maybeUpdateCache = (result: Result<T, E>): void => {
    const metadata = policy.updateMetadata(result);
    if (metadata.some) cached = { result, metadata: metadata.value };
  };
  return {
    isValid: () => !!cached && policy.isFresh(cached.metadata),
    update: maybeUpdateCache,
    get value() {
      return cached.result;
    },
  };
};

/**
 *
 * @param producer - An expensive operation that returns a Result<T,E>/Promise<Result<T,E>> ADT.
 * @param policy - a configurable cache (in)validation policy
 */
export function memoize<T, E, Metadata>(
  producer: () => Promise<Result<T, E>>,
  policy: CachePolicy<T, E, Metadata>,
): () => Promise<Result<T, E>>;

export function memoize<T, E, Metadata>(
  producer: () => Result<T, E>,
  policy: CachePolicy<T, E, Metadata>,
): () => Result<T, E>;

export function memoize<T, E, Metadata>(
  producer: () => Awaitable<Result<T, E>>,
  policy: CachePolicy<T, E, Metadata>,
): () => Awaitable<Result<T, E>> {
  const cache = createPolicedCache(policy);
  let pending: Promise<Result<T, E>> | undefined;

  const evaluate = () => {
    if (pending) return pending;

    const awaitable = producer();
    if (!isPromise(awaitable)) cache.update(awaitable);
    else {
      pending = awaitable;
      awaitable.then(cache.update).finally(() => {
        pending = undefined;
      });
    }
    return awaitable;
  };
  return () => (cache.isValid() ? cache.value : evaluate());
}
