import { SafeExecutionError } from "./errors.js";

export const toSafeErrorMapper =
  <E>(onError: (cause: unknown) => E) =>
  (originalError: unknown): E | SafeExecutionError => {
    try {
      return onError(originalError);
    } catch (mapperError) {
      return new SafeExecutionError(originalError, mapperError);
    }
  };
