import type { Option } from "@option:core/types";
import {
  fromOptOr as fromOptOrCore,
  fromOptOrElse as fromOptOrElseCore,
} from "@result:core/from/fromOption";

import type { Result } from "@result:core/types";
export const fromOptOr =
  <E>(error: E) =>
  <T>(option: Option<T>): Result<T, E> =>
    fromOptOrCore(option, error);
export const fromOptOrElse =
  <E>(errFn: () => E) =>
  <T>(option: Option<T>): Result<T, E> =>
    fromOptOrElseCore(option, errFn);
