export type { ErrorContext, GetErrorContext } from "./result.internal.js";

const STR_SA_EX = "SafeExecution";
const STR_ERR = "Error";

type SaExLit = typeof STR_SA_EX;
type ErrLit = typeof STR_ERR;
type SaExEr = `${SaExLit}${ErrLit}`;
const STR_SA_EX_ERR = (STR_SA_EX + STR_ERR) as SaExEr;

const STR_CAPTURE_STACKTRACE = "captureStackTrace";
const ERR_MSG =
  "Critical: The error mapper function crashed. See 'mapperError' and 'originalError'.";
export class SafeExecutionError extends Error {
  public override readonly name: SaExEr = STR_SA_EX_ERR;
  public readonly kind: SaExLit = STR_SA_EX;
  public readonly originalError: unknown;
  public readonly mapperError: unknown;
  constructor(originalError: unknown, mapperError: unknown) {
    super(ERR_MSG);
    // biome-ignore lint/complexity/noUselessThisAlias: <mangle>
    const self = this;
    //@ts-expect-error readonly
    self.originalError = originalError;
    //@ts-expect-error readonly
    self.mapperError = mapperError;
    Object.setPrototypeOf(self, SafeExecutionError.prototype);
    if (
      STR_CAPTURE_STACKTRACE in Error
      && typeof Error[STR_CAPTURE_STACKTRACE] === "function"
    )
      Error[STR_CAPTURE_STACKTRACE](self, SafeExecutionError);
  }
}

export const isSafeExecutionError = (e: unknown): e is SafeExecutionError =>
  e instanceof SafeExecutionError
  || (typeof e === "object"
    && e !== null
    && (e as SafeExecutionError).kind === STR_SA_EX
    && (e as SafeExecutionError).name === STR_SA_EX_ERR);
