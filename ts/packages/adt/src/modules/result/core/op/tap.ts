import type { Result } from "../../primitive.js";

export const tap = <T, E>(
  result: Result<T, E>,
  tapFn: (okValue: T) => void,
): Result<T, E> => {
  result.ok === true && tapFn(result.value);
  return result;
};

export const tapErr = <T, E>(
  result: Result<T, E>,
  tapFn: (errValue: E) => void,
): Result<T, E> => {
  result.ok === false && tapFn(result.error);
  return result;
};

export const tapAsync = async <T, E>(
  result: Result<T, E>,
  tapFn: (okValue: T) => Promise<void>,
): Promise<Result<T, E>> => {
  result.ok === true && (await tapFn(result.value));
  return result;
};

export const tapErrAsync = async <T, E>(
  result: Result<T, E>,
  tapFn: (errValue: E) => Promise<void>,
): Promise<Result<T, E>> => {
  result.ok === false && (await tapFn(result.error));
  return result;
};
