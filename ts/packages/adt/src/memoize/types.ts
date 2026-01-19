import type { Option } from "@option/types";
import type { Result } from "@result/types";



/**
 * A policy is an entity that manages the "Metadata" associated with an instance of a cacheable Result.
 */
export interface CachePolicy<T, E, Metadata = null> {
  /**
   * @param result - The resolved producer result
   * @returns - metadata associated with the producer result for evaluation in the freshness check {@link isFresh}
   */
  updateMetadata(result: Result<T, E>): Option<Metadata>;

  /**
   * @param metadata - The metadata associated with the latest cached result
   * @returns {boolean} - decision outcome to keep or invalidate most recent cached result
   */
  isFresh(metadata: Metadata): boolean;
}