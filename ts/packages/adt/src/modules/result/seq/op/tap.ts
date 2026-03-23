import type { Result } from "../../primitive.js";
export const tap =
  <T>(tapFn: (okValue: T) => void) =>
  <E>(result: Result<T, E>): Result<T, E> => {
    result.ok === true && tapFn(result.value);
    return result;
  };
export const tapErr =
  <E>(tapFn: (errValue: E) => void) =>
  <T>(result: Result<T, E>): Result<T, E> => {
    result.ok === false && tapFn(result.error);
    return result;
  };
export const tapAsync =
  <T>(tapFn: (okValue: T) => Promise<void>) =>
  async <E>(result: Result<T, E>): Promise<Result<T, E>> => {
    result.ok === true && (await tapFn(result.value));
    return result;
  };

export const tapErrAsync =
  <E>(tapFn: (errValue: E) => Promise<void>) =>
  async <T>(result: Result<T, E>): Promise<Result<T, E>> => {
    result.ok === false && (await tapFn(result.error));
    return result;
  };
