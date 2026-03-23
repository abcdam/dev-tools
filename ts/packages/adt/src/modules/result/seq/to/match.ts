import type { Result } from "../../primitive.js";

export const matchOr =
  <T, RO, RE = RO>(onOk: (okInner: T) => RO, errValue: RE) =>
  <E>(result: Result<T, E>): RO | RE =>
    result.ok === true ? onOk(result.value) : errValue;
export const matchElse =
  <T, E, RO, RE = RO>(onOk: (okInner: T) => RO, onErr: (errInner: E) => RE) =>
  (result: Result<T, E>): RO | RE =>
    result.ok === true ? onOk(result.value) : onErr(result.error);
