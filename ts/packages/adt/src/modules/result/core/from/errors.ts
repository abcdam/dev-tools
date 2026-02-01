export interface ISafeExecutionError extends Error {
  readonly name: "SafeExecutionError";
  readonly kind: "SafeExecution";
  readonly originalError: unknown;
  readonly mapperError: unknown;
}

export class SafeExecutionError extends Error implements ISafeExecutionError {
  public override readonly name = "SafeExecutionError"; // Explicit public property (satisfy interface narrowing)
  public readonly kind = "SafeExecution";
  public readonly originalError: unknown;
  public readonly mapperError: unknown;
  constructor(originalError: unknown, mapperError: unknown) {
    super(
      "Critical: The error mapper function crashed. See 'mapperError' and 'originalError'.",
    );
    this.originalError = originalError;
    this.mapperError = mapperError;
    Object.setPrototypeOf(this, SafeExecutionError.prototype);
    if (
      "captureStackTrace" in Error &&
      typeof Error.captureStackTrace === "function"
    )
      Error.captureStackTrace(this, SafeExecutionError);
  }
}

export const isSafeExecutionError = (e: unknown): e is SafeExecutionError =>
  e instanceof SafeExecutionError ||
  (typeof e === "object" &&
    !!e &&
    "kind" in e &&
    e.kind === "SafeExecution" &&
    "name" in e &&
    e.name === "SafeExecutionError");
