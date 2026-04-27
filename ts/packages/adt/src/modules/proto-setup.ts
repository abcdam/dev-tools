import type {
  NoneConstructor,
  SomeConstructor,
} from "#option/construct.internal.js";
import type {
  ErrConstructor,
  OkConstructor,
} from "#result/construct.internal.js";

export const FREEZE: typeof Object.freeze = Object.freeze;
const ASSIGN: typeof Object.assign = Object.assign;
type Discriminator<T extends "exists" | "ok" = "exists" | "ok"> = T;
type ProtoList<T, U> = [sad: T, happy: U];
type ProtoMap = {
  [K in Discriminator]: K extends Discriminator<"exists">
    ? ProtoList<NoneConstructor, SomeConstructor>
    : ProtoList<ErrConstructor, OkConstructor>;
};

export const configureSealedProtos: <
  U extends Discriminator,
  const T extends ProtoMap[U],
>(
  key: U,
  list: T,
  _toJSON: T[number]["prototype"]["toJSON"],
) => void = (key, list, _toJSON) =>
  list.forEach(
    ({ prototype: p }, idx) =>
      void FREEZE(ASSIGN(p, { toJSON: _toJSON, [key]: !!idx })),
  );
