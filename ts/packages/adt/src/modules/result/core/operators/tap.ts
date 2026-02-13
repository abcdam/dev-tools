import type { Result } from "@result:core/types";

export const tap = <T, E>(
  result: Result<T, E>,
  tapFn: (okValue: T) => void,
): Result<T, E> => {
  if (result.ok) tapFn(result.value);
  return result;
};

export const tapErr = <T, E>(
  result: Result<T, E>,
  tapFn: (errValue: E) => void,
): Result<T, E> => {
  if (!result.ok) tapFn(result.error);
  return result;
};

export const tapAsync = async <T, E>(
  result: Result<T, E>,
  tapFn: (okValue: T) => Promise<void>,
): Promise<Result<T, E>> => {
  if (result.ok) await tapFn(result.value);
  return result;
};

export const tapErrAsync = async <T, E>(
  result: Result<T, E>,
  tapFn: (errValue: E) => Promise<void>,
): Promise<Result<T, E>> => {
  if (!result.ok) await tapFn(result.error);
  return result;
};
