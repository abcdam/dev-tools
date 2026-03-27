import * as fs from "node:fs";
import * as path from "node:path";

//
// ---- SPEC -----
//
const PRIMARY_GENERIC = "V";
const ANY_TYPE = "any";
const adtSymbolDef = ((d) =>
  ({
    ...d,
    resultType: `Result<${d.okType}, ${d.errType}>`,
    optionType: `Option<${d.okType}>`,
  }) as const)({
  okType: PRIMARY_GENERIC,
  errType: "E",
  okSym: "input",
  errSym: "errValue",
  resultSym: "result",
  optionSym: "option",
} as const);
const createSymTypePair = (sym: string, ty: string) => ({ sym, ty });
const toSymTypeDecl = ({ sym, ty }: SymTypeDef) => `${sym}: ${ty}`;
type SymTypeDef = ReturnType<typeof createSymTypePair>;
const okInput = createSymTypePair(adtSymbolDef.okSym, adtSymbolDef.okType);
const errInput = createSymTypePair(adtSymbolDef.errSym, adtSymbolDef.errType);
const resultInput = createSymTypePair(
  adtSymbolDef.resultSym,
  adtSymbolDef.resultType,
);
const optionInput = createSymTypePair(
  adtSymbolDef.optionSym,
  adtSymbolDef.optionType,
);
const errFnInput = createSymTypePair(
  "errFn",
  `(${toSymTypeDecl(okInput)}) => ${adtSymbolDef.errType}`,
);

const implVariants = ["data-last", "data-first"] as const;
type ImplVariant = (typeof implVariants)[number];
type AdtVariant = "result" | "option";
interface AdtData<Adt extends AdtVariant, Kind extends ImplVariant> {
  adt: Adt;
  kind: Kind;
  primary: SymTypeDef;
}

interface OptionData<Variant extends ImplVariant>
  extends AdtData<"option", Variant> {}

interface ResultData<Variant extends ImplVariant>
  extends AdtData<"result", Variant> {
  secondary: SymTypeDef;
}

type DataDef = {
  [V in ImplVariant]: OptionData<V> | ResultData<V>;
}[ImplVariant];

const defineSpec = (
  fnSymbol: string,
  baseGenericDef: string,
  dataDef: DataDef,
  returnDef: string,
  outPath: string,
) => ({
  fnSymbol,
  baseGenericDef,
  dataDef,
  returnDef,
  outPath,
});

const buildOutPath = (
  adt: AdtVariant,
  fnSymbol: string,
  variant: ImplVariant,
  namespace: string,
) =>
  `src/modules/${adt}/${variant === "data-first" ? "core" : "seq"}/${namespace}/${fnSymbol.match(/^[a-z]+/)![0]}.ts`;

const defineResultSpec = (
  fnSymbol: string,
  primary: SymTypeDef,
  secondary: SymTypeDef,
  namespace: "from" | "op",
) =>
  implVariants.map((kind) =>
    defineSpec(
      fnSymbol,
      `${adtSymbolDef.okType}, ${adtSymbolDef.errType}`,
      { adt: "result", kind, primary, secondary },
      `Result<UNION_PLACEHOLDER, ${adtSymbolDef.errType}>`,
      buildOutPath("result", fnSymbol, kind, namespace),
    ),
  );
const defineOptionSpec = (
  fnSymbol: string,
  primary: SymTypeDef,
  namespace: "from" | "op",
) =>
  implVariants.map((kind) =>
    defineSpec(
      fnSymbol,
      adtSymbolDef.okType,
      { adt: "option", kind, primary },
      "Option<UNION_PLACEHOLDER>",
      buildOutPath("option", fnSymbol, kind, namespace),
    ),
  );

const specs = [
  //////// Result
  ...defineResultSpec("checkOr", okInput, errInput, "from"),
  ...defineResultSpec("checkElse", okInput, errFnInput, "from"),
  ...defineResultSpec("filterOr", resultInput, errInput, "op"),
  ...defineResultSpec("filterElse", resultInput, errFnInput, "op"),

  //////// Option
  ...defineOptionSpec("check", okInput, "from"),
  ...defineOptionSpec("filter", optionInput, "op"),
];
type Spec = (typeof specs)[number];

//
// --- HELPERS ---
//
const getExclude = (i: number) => {
  if (i === 1) return "V";
  const rs = Array.from({ length: i - 1 }, (_, k) => `R${k + 1}`).join(" | ");
  return `Exclude<V, ${rs}>`;
};

const makeGenericsGenerator = (baseGen: string) => (n: number) => {
  const types = Array.from(
    { length: n },
    (_, i) => `R${i + 1} extends ${getExclude(i + 1)}`,
  );
  return `<${baseGen}, ${types.join(", ")}>`;
};

const getGuardsTuple = (n: number) => {
  const guards = Array.from(
    { length: n },
    (_, i) => `g${i + 1}: GuardFn<${getExclude(i + 1)}, R${i + 1}>`,
  );
  return `...guards: [${guards.join(", ")}]`;
};

const getUnion = (n: number) =>
  Array.from({ length: n }, (_, i) => `R${i + 1}`).join(" | ");

//
// --- GENERATORS ---
//
function makeOverloadGenerator(spec: Spec) {
  const { fnSymbol, baseGenericDef, dataDef, returnDef } = spec;
  const getGenerics = makeGenericsGenerator(baseGenericDef);
  return (n: number) => {
    const generics = getGenerics(n);
    const union = getUnion(n);
    const returnType = returnDef.replace("UNION_PLACEHOLDER", union);
    const guards = getGuardsTuple(n);

    const sharedFnDeclBase = `export function ${fnSymbol}${generics}`;
    const primaryDecl = toSymTypeDecl(dataDef.primary);
    const secondaryDecl =
      "secondary" in dataDef ? [toSymTypeDecl(dataDef.secondary)] : [];
    const args = [
      ...(dataDef.kind === "data-first" ? [primaryDecl] : []),
      ...secondaryDecl,
      guards,
    ];
    const sharedFnDecl = `${sharedFnDeclBase}(\n  ${args.join(",\n  ")}\n)`;
    const partialReturnSignature =
      dataDef.kind === "data-first" ? "" : `(${primaryDecl}) =>`;
    return `${sharedFnDecl}: ${partialReturnSignature} ${returnType};`;
  };
}

function getImplementation(spec: Spec): string {
  const isDataLast = spec.dataDef.kind === "data-last";
  const implArgs = [];
  if (!isDataLast)
    implArgs.push(toSymTypeDecl({ ...spec.dataDef.primary, ty: ANY_TYPE }));
  if ("secondary" in spec.dataDef)
    implArgs.push(toSymTypeDecl({ ...spec.dataDef.secondary, ty: ANY_TYPE }));
  implArgs.push(`...predicates: any[]`);

  const implDecl = `export function ${spec.fnSymbol}(\n  ${implArgs.join(",\n  ")}\n)`;

  const fn = spec.fnSymbol;
  const primaryName = spec.dataDef.primary.sym;
  const secondaryName =
    "secondary" in spec.dataDef ? spec.dataDef.secondary.sym : "";

  const isOption = spec.dataDef.adt === "option";
  const isFilterFn = fn.startsWith("filter");
  const unwrapCircuit = isFilterFn
    ? `if (${primaryName}.${isOption ? "exists" : "ok"} === false) return ${primaryName};\n const v = ${primaryName}.value;`
    : "";
  const failArg = isFilterFn ? "v" : primaryName;
  const failHandlerCall = fn.endsWith("Else") ? `(${failArg})` : "";
  const onFailHandlerImpl = `${secondaryName}${failHandlerCall}`;
  const onSuccessHandlerImpl = isFilterFn
    ? primaryName
    : `${isOption ? "some" : "ok"}(${primaryName})`;
  const loopImplShared = `
    const limit = predicates.length;
    for (let i = 0; i < limit; i++) if (predicates[i](${isFilterFn ? "v" : primaryName})) return ${onSuccessHandlerImpl};
    return ${isOption ? "none()" : `err(${onFailHandlerImpl})`};
    `;

  const logic = `${unwrapCircuit}${loopImplShared}`;

  return `${implDecl} {${
    isDataLast ? `return (${primaryName}: any) => {\n${logic}\n};` : logic
  }}`;
}

function genCatchAllOverload(spec: Spec): string {
  const isDataFirst = spec.dataDef.kind === "data-first";
  const catchAllReturnType = spec.returnDef.replace(
    "UNION_PLACEHOLDER",
    adtSymbolDef.okType,
  );
  const predicateArg = `...predicates: Array<(${toSymTypeDecl(okInput)}) => boolean>`;

  const catchAllArgs = [];
  const primaryArgDecl = toSymTypeDecl(spec.dataDef.primary);
  if (isDataFirst) catchAllArgs.push(primaryArgDecl);
  if ("secondary" in spec.dataDef)
    catchAllArgs.push(toSymTypeDecl(spec.dataDef.secondary));
  catchAllArgs.push(predicateArg);

  const functionDeclBase = `export function ${spec.fnSymbol}<${spec.baseGenericDef}>`;
  const functionDeclArgs = catchAllArgs.join(",\n  ");
  const functionDeclReturnType = isDataFirst
    ? catchAllReturnType
    : `(${primaryArgDecl}) => ${catchAllReturnType}`;

  return `${functionDeclBase}(\n  ${functionDeclArgs}\n): ${functionDeclReturnType};`;
}

const generateGroupedChunks = (
  specs: Spec[],
  maxOverloads = 8,
): Map<string, string[]> =>
  specs.reduce((map, spec) => {
    const overloadGenerator = makeOverloadGenerator(spec);
    const chunks = Array.from({ length: maxOverloads }).map((_, idx) =>
      overloadGenerator(idx + 1),
    );
    map.set(spec.outPath, [
      ...(map.get(spec.outPath) ?? []),
      ...chunks,
      genCatchAllOverload(spec),
      getImplementation(spec),
    ]);
    return map;
  }, new Map<string, string[]>());

function buildFileContent(outPath: string, chunks: string[]): string {
  const isResult = outPath.includes("/result/");
  const isFilter = outPath.includes("/filter");
  const imports = [
    isResult
      ? `import { ${isFilter ? "" : "ok,"} err, type Result } from "#result/primitive.js";`
      : `import { ${isFilter ? "" : "some,"} none, type Option } from "#option/primitive.js";`,
    `import type { GuardFn } from "#utility/guard.js";`,
  ].join("\n");

  return `${[
    `////////////////////////////////////////////////////////////
// ======    AUTO-GENERATED FILE. DO NOT EDIT.    ====== //
//////////////////////////////////////////////////////////`,
    imports,
    ...chunks,
  ].join("\n\n")}\n`;
}

function runGenerator(specsToGenerate: Spec[]): void {
  console.log("Starting type generation pipeline...");
  const fileMap = generateGroupedChunks(specsToGenerate);
  for (const [outPath, chunks] of fileMap.entries()) {
    const content = buildFileContent(outPath, chunks);
    const fullPath = path.resolve(process.cwd(), outPath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, "utf-8");
    console.log(`Wrote ${outPath}`);
  }
  console.log("Done.");
}

runGenerator(specs);
