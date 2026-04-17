import type { BaseOption, None, Some } from "./primitive.js";

interface SomeConstructor {
  new <T>(v: T): Some<T>;
}
interface NoneConstructor {
  new (): None;
}

const [S, N] = /*#__PURE__*/ (() => {
  function Some(this: BaseOption, v: unknown) {
    (this as any).val = v;
  }
  function None() {}

  // this is necessary for pojo handling at the boundery (e.g. JSON.stringify).
  // for deserialization, we can rely on the fact that the library implementation
  //  is fully backwards compatible:
  //  all opt -> opt mapper functions automatically rehydrate passed in option pojos
  const toJSON = function (this: BaseOption) {
    return this.exists ? { exists: true, val: this.val } : { exists: false };
  };
  const T = ["None", "Some"];
  // prototype config
  [None, Some].forEach((ctor, i) => {
    const p = ctor.prototype;
    p.exists = !!i;
    // TODO: evaluate usefulnes
    p[Symbol.toStringTag] = T[i];
    p.toJSON = toJSON;
    Object.freeze(p);
  });

  return [Some, None] as unknown as [SomeConstructor, NoneConstructor];
})();

export const _S: SomeConstructor = S;
export const _N: NoneConstructor = N;
