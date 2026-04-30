/** biome-ignore-all lint/complexity/useArrowFunction: <'this' required> */
import { configureSealedProtos, FREEZE } from "../proto-setup.js";
import type {
  InferSome,
  None as NoneT,
  Option,
  OptionBase,
  Some as SomeT,
} from "./primitive.js";

export interface OptionProto<O extends OptionBase> {
  readonly exists: O["exists"];
  toJSON(this: O): Option<InferSome<O>>;
}
export interface SomeConstructor {
  new <T>(val: T): SomeT<T>;
  readonly prototype: OptionProto<SomeT<unknown>>;
}
export interface NoneConstructor {
  new (): NoneT;
  readonly prototype: OptionProto<NoneT>;
}

// this is necessary for pojo handling at the boundery (e.g. JSON.stringify).
// for deserialization, we can rely on the fact that the library implementation
//  is fully backwards compatible:
//  all opt -> opt mapper functions automatically rehydrate passed in option pojos
export const _toJSON = function <T>(this: Option<T>): Option<T> {
  // biome-ignore lint/complexity/noUselessThisAlias: <shake tree>
  const self = this;
  const exists = self.exists;
  return exists ? { exists: exists, val: self.val } : { exists: exists };
};

const None = function () {} as unknown as NoneConstructor;
const Some = function <T>(this: SomeT<T>, val: T) {
  //@ts-expect-error readonly
  this.val = val;
} as unknown as SomeConstructor;

configureSealedProtos("exists", [None, Some], _toJSON);
export const _Some: SomeConstructor = Some;
export const _NONE: NoneT = /*#__PURE__*/ FREEZE(new None());
