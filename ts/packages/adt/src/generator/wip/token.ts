// type TypeToken<T extends string> = { readonly ty: T };
// type SymToken<S extends string> = { readonly sym: S };

// const defTyToken = <Ty extends string>(ty: Ty): TypeToken<Ty> => ({ ty });
// const defSymToken = <Sym extends string>(sym: Sym): SymToken<Sym> => ({ sym });
// const defSymTyTokenPair = <Sym extends string, Ty extends string>(
//   sym: Sym,
//   ty: Ty,
// ): SymToken<Sym> & TypeToken<Ty> => ({ sym, ty });

const adtVariants = ["result", "option", ""] as const;
type AdtVariant = (typeof adtVariants)[number];

type UnaryToken<Id extends string, P extends string> = `${Id}<${P}>`;
type BinaryToken<
  Id extends string,
  P1 extends string,
  P2 extends string,
> = UnaryToken<Id, `${P1},${P2}`>;

export type TypeToken = SimpleDataToken | CompositeDataToken;

interface KindAttribute<K extends string> {
  kind: K;
}
interface BaseDataToken<K extends string = string, N extends string = string>
  extends KindAttribute<K> {
  name: N;
}

export interface TokenDeclaration<
  S extends string = string,
  T extends TypeToken = TypeToken,
> {
  symbol: S;
  tyInfo: T;
}

interface SimpleDataToken<N extends string = string>
  extends BaseDataToken<"simple", N> {}

type CompositeArgs = [TokenDeclaration, ...TokenDeclaration[]];
interface CompositeDataToken<
  N extends string = string,
  A extends CompositeArgs = CompositeArgs,
> extends BaseDataToken<"composite", N> {
  args: A;
}
type DeclareToken<
  Symbol extends string,
  T extends TypeToken,
> = TokenDeclaration<Symbol, T>;
type DataToken = DeclareToken<"data", SimpleDataToken<"T">>;
type ErrorToken = DeclareToken<"errValue", SimpleDataToken<"E">>;
type OptionToken = DeclareToken<
  "option",
  CompositeDataToken<"Option", [DataToken]>
>;
type ResultToken = DeclareToken<
  "result",
  CompositeDataToken<"Result", [DataToken, ErrorToken]>
>;

const declareSimpleToken = <Symbol extends string, Name extends string>(
  symbol: Symbol,
  name: Name,
): DeclareToken<Symbol, SimpleDataToken<Name>> => ({
  symbol,
  tyInfo: { kind: "simple", name },
});

const declareCompositeToken = <
  Symbol extends string,
  Name extends string,
  Args extends CompositeArgs,
>(
  symbol: Symbol,
  name: Name,
  ...args: Args
): DeclareToken<Symbol, CompositeDataToken<Name, Args>> => ({
  symbol,
  tyInfo: { kind: "composite", name, args },
});

const dataToken = declareSimpleToken("data", "T");

type SymTypePair<
  S extends string = string,
  T extends string = string,
> = Readonly<{
  sym: S;
  ty: T;
}>;
const symTypePair = <Sym extends string, Ty extends string>(
  sym: Sym,
  ty: Ty,
): SymTypePair<Sym, Ty> => ({ sym, ty });
