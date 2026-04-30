import { configureSealedProtos } from "../proto-setup.js";
import type {
  Err as ErrT,
  NormalizeResult,
  Ok as OkT,
  Result,
  ResultBase,
} from "./primitive.js";

export interface ResultProto<R extends ResultBase> {
  readonly ok: R["ok"];
  toJSON(this: R): NormalizeResult<R>;
}

export interface ErrConstructor {
  new <E>(err: E): ErrT<E>;
  readonly prototype: ResultProto<ErrT<unknown>>;
}
export interface OkConstructor {
  new <T>(val: T): OkT<T>;
  readonly prototype: ResultProto<OkT<unknown>>;
}
const Err = function <E>(this: ErrT<E>, err: E) {
  // @ts-expect-error readonly
  this.err = err;
} as unknown as ErrConstructor;

const Ok = function <T>(this: OkT<T>, val: T) {
  // @ts-expect-error readonly
  this.val = val;
} as unknown as OkConstructor;

// this is necessary for pojo handling at the boundery (e.g. JSON.stringify).
// for deserialization, we can rely on the fact that the library implementation
//  is fully backwards compatible:
//  all opt -> opt mapper functions automatically rehydrate passed in option pojos
export const _toJSON = function <T, E>(this: Result<T, E>): Result<T, E> {
  // biome-ignore lint/complexity/noUselessThisAlias: <shake tree>
  const self = this;
  const ok = self.ok;
  // biome-ignore format: readability
  return ok
      ? { ok: ok, val: self.val } 
      : { ok: ok, err: self.err };
};
configureSealedProtos("ok", [Err, Ok], _toJSON);

export const _Ok: OkConstructor = Ok;
export const _Err: ErrConstructor = Err;
