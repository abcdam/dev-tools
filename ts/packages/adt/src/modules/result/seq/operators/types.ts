export type DeadCodeError<Reason extends string> = {
  "♻️ Useless call. Can be safely removed": Reason;
};

export type CheckExistence<T, FailMsg extends string> = [T] extends [never]
  ? DeadCodeError<FailMsg>
  : unknown;
export type OkDefined<T> = CheckExistence<
  T,
  "❌ Mapping Ok on a guaranteed error"
>;

export type ErrDefined<E> = CheckExistence<
  E,
  "❌ Mapping Err on guaranteed success"
>;
