import type { Result } from "../../primitive.js";
export const selectOr =
  <RO, RE = RO>(okValue: RO, errValue: RE) =>
  <T, E>(result: Result<T, E>): RO | RE =>
    result.ok === true ? okValue : errValue;
export const selectElse =
  <E, RO, RE = RO>(okValue: RO, onErr: (errInner: E) => RE) =>
  <T>(result: Result<T, E>): RO | RE =>
    result.ok === true ? okValue : onErr(result.error);
