import { SafeExecutionError } from "./execution.error.js";
import { type Err, err } from "./primitive.js";

export type DeadCodeError<Reason extends string> = {
  "♻️ Useless call. Can be safely removed": Reason;
};

export type CheckExistence<T, FailMsg extends string> = [T] extends [never]
  ? DeadCodeError<FailMsg>
  : unknown;
export type OkNotNever<T> = CheckExistence<
  T,
  "❌ Mapping Ok on a guaranteed error"
>;

export type ErrNotNever<E> = CheckExistence<
  E,
  "❌ Mapping Err on guaranteed success"
>;
export const mapErrSafely =
  (originalError: unknown) =>
  (mapperError: unknown): Err<SafeExecutionError> =>
    err(new SafeExecutionError(originalError, mapperError));
