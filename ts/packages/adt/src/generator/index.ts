import * as fs from "node:fs";
import * as path from "node:path";

//
// ---- SPEC -----
//

const BASE_TY_DEF = {
  anyTy: "any",
} as const;

const PRIM_DEF = {
  ty: "T",
  subTy: "U",
} as const;

const adtSymbolDef = (d =>
  ({
    ...d,
    resultType: `Result<${d.okType}, ${d.errType}1>`,
    optionType: `Option<${d.okType}>`,
  }) as const)({
  okType: PRIM_DEF.ty,
  errType: "E",
  okSym: "data",
  errSym: "errValue",
  resultSym: "result",
  optionSym: "option",
} as const);
const createSymTypePair = (sym: string, ty: string) => ({ sym, ty });
const toSymTypeDecl = ({ sym, ty }: SymTypeDef) => `${sym}: ${ty}`;
type SymTypeDef = ReturnType<typeof createSymTypePair>;
const okInput = createSymTypePair(adtSymbolDef.okSym, adtSymbolDef.okType);
const errInput = createSymTypePair(
  adtSymbolDef.errSym,
  `${adtSymbolDef.errType}`,
);
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
const adtVariants = [adtSymbolDef.resultSym, adtSymbolDef.optionSym] as const;
type ImplVariant = (typeof implVariants)[number];
type AdtVariant = (typeof adtVariants)[number];
interface AdtData<Adt extends AdtVariant, Kind extends ImplVariant> {
  adt: Adt;
  kind: Kind;
  primary: SymTypeDef;
  baseType: string;
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
  baseGenericDef: [string, ...string[]],
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
  implVariants.map(kind =>
    defineSpec(
      fnSymbol,
      [adtSymbolDef.okType, adtSymbolDef.errType],
      { adt: "result", kind, primary, secondary, baseType: "BaseResult" },
      `Result<UNION_PLACEHOLDER, UNION_ERR_PLACEHOLDER>`,
      buildOutPath("result", fnSymbol, kind, namespace),
    ),
  );
const defineOptionSpec = (
  fnSymbol: string,
  primary: SymTypeDef,
  namespace: "from" | "op",
) =>
  implVariants.map(kind =>
    defineSpec(
      fnSymbol,
      [adtSymbolDef.okType],
      { adt: "option", kind, primary, baseType: "BaseOption" },
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
const getUnion = (n: number) =>
  Array.from({ length: n }, (_, i) => `${PRIM_DEF.subTy}${i + 1}`).join(" | ");

const getExclude = (i: number) =>
  i === 1 ? PRIM_DEF.ty : `Exclude<${PRIM_DEF.ty}, ${getUnion(i - 1)}>`;

const getGuardsTuple = (n: number, errFallback?: string) => {
  const guards = Array.from(
    { length: n },
    (_, i) =>
      `g${i + 1}: GuardFn<${getExclude(i + 1)}, ${PRIM_DEF.subTy}${i + 1}>`,
  );
  return `...guards${errFallback ? "WithErrFallback" : ""}: [${guards.join(", ")}${errFallback ? `,${errFallback}` : ""}]`;
};

//
// --- GENERATORS ---
//

function makeOverloadGenerator(spec: Spec) {
  const { fnSymbol, dataDef, returnDef } = spec;
  const inputIsAdt = fnSymbol.startsWith("filter");
  const inputWithErrValue = dataDef.adt === "result";
  const inputIsFirst = dataDef.kind === "data-first";
  const errGenericInput = inputWithErrValue
    ? [
        inputIsAdt
          ? inputIsFirst
            ? `${errInput.ty}1,${errInput.ty}2`
            : `${errInput.ty}2`
          : errInput.ty,
      ]
    : [];
  const errGenericOutput = inputIsAdt
    ? `${errInput.ty}1 | ${errInput.ty}2`
    : errInput.ty;
  const fnGenericsBase = [okInput.ty, ...errGenericInput];
  const getGenerics = (n: number) => {
    const types = Array.from(
      { length: n },
      (_, i) => `${PRIM_DEF.subTy}${i + 1} extends ${getExclude(i + 1)}`,
    );

    const fnGenerics = [...fnGenericsBase, ...types].join(", ");
    return `<${fnGenerics}>`;
  };
  return (n: number) => {
    const generics = getGenerics(n);
    const union = getUnion(n);
    const returnType = returnDef
      .replace("UNION_PLACEHOLDER", union)
      .replace("UNION_ERR_PLACEHOLDER", errGenericOutput);
    const secondaryDecl =
      "secondary" in dataDef
        ? toSymTypeDecl(dataDef.secondary) + (inputIsAdt ? "2" : "")
        : undefined;
    const fnList = getGuardsTuple(n, secondaryDecl);

    const sharedFnDeclBase = `export function ${fnSymbol}${generics}`;
    const primaryDecl = toSymTypeDecl(dataDef.primary);

    const args = [...(inputIsFirst ? [primaryDecl] : []), fnList];
    const sharedFnDecl = `${sharedFnDeclBase}(\n  ${args.join(",\n  ")}\n)`;
    const partialReturnSignature = inputIsFirst
      ? ""
      : `${inputWithErrValue && inputIsAdt ? `<E1>` : ""}(${primaryDecl}) =>`;
    return `${sharedFnDecl}: ${partialReturnSignature} ${returnType};`;
  };
}

function getImplementation(spec: Spec): string {
  const isDataLast = spec.dataDef.kind === "data-last";
  const implArgs = [];
  const fn = spec.fnSymbol;
  const primaryName = spec.dataDef.primary.sym;
  const secondaryName =
    "secondary" in spec.dataDef ? spec.dataDef.secondary.sym : "";
  const fnListSym = `fns${secondaryName ? "WithErrFallback" : ""}`;

  const secondaryDeclStmt = secondaryName
    ? `const ${secondaryName} = ${fnListSym}.pop();`
    : "";
  const loopLimitDeclStmt = `const limit = ${fnListSym}.length;`;

  if (!isDataLast)
    implArgs.push(
      toSymTypeDecl({ ...spec.dataDef.primary, ty: spec.dataDef.baseType }),
    );

  implArgs.push(`...${fnListSym}: any[]`);

  const implDecl = `export function ${spec.fnSymbol}(\n  ${implArgs.join(",\n  ")}\n)`;

  const isOption = spec.dataDef.adt === "option";
  const isFilterFn = fn.startsWith("filter");
  const unwrapCircuit = isFilterFn
    ? `if (${primaryName}.${isOption ? "exists" : "ok"} === false) return ${primaryName};\n const v = ${primaryName}.val;`
    : "";
  const failArg = isFilterFn ? "v" : primaryName;
  const failHandlerCall = fn.endsWith("Else") ? `(${failArg})` : "";
  const onFailHandlerImpl = `${secondaryName}${failHandlerCall}`;
  const onSuccessHandlerImpl = isFilterFn
    ? primaryName
    : `${isOption ? "some" : "ok"}(${primaryName})`;
  const loopImplShared = `for (let i = 0; i < limit; i++) if (${fnListSym}[i](${isFilterFn ? "v" : primaryName})) return ${onSuccessHandlerImpl};
    return ${isOption ? "_NONE" : `err(${onFailHandlerImpl})`};
    `;

  const logicClosureFnExpr = (...stmts: string[]) =>
    `return (${primaryName}: ${spec.dataDef.baseType}) => {${stmts.join("\n")}}`;

  return `${implDecl} {
  ${
    isDataLast
      ? [
          secondaryDeclStmt,
          loopLimitDeclStmt,
          logicClosureFnExpr(unwrapCircuit, loopImplShared),
        ]
          .filter(Boolean)
          .join("\n")
      : [unwrapCircuit, secondaryDeclStmt, loopLimitDeclStmt, loopImplShared]
          .filter(Boolean)
          .join("\n")
  }}`;
}

function genCatchAllOverload(spec: Spec): string {
  const isDataFirst = spec.dataDef.kind === "data-first";
  const inputIsAdt = spec.fnSymbol.startsWith("filter");
  const hasFallback = "secondary" in spec.dataDef;
  const errGenericOutput = inputIsAdt
    ? `${errInput.ty}1 | ${errInput.ty}2`
    : errInput.ty;
  const catchAllReturnType = spec.returnDef
    .replace("UNION_PLACEHOLDER", adtSymbolDef.okType)
    .replace("UNION_ERR_PLACEHOLDER", errGenericOutput);
  const predicateFn = `PredicateFn<${adtSymbolDef.okType}>`;
  const fnListSym = `predicates${hasFallback ? "WithErrFallback" : ""}`;
  const predicateArg = `...${fnListSym}: [${predicateFn},...${predicateFn}[]${
    hasFallback
      ? `,${toSymTypeDecl(spec.dataDef.secondary) + (inputIsAdt ? 2 : "")}`
      : ""
  }]`;

  const catchAllArgs = [];
  const primaryArgDecl = toSymTypeDecl(spec.dataDef.primary);
  if (isDataFirst) catchAllArgs.push(primaryArgDecl);
  catchAllArgs.push(predicateArg);

  const functionDeclBase = `export function ${spec.fnSymbol}<${okInput.ty}${hasFallback ? `,${inputIsAdt ? `${isDataFirst ? "E1," : ""}E2` : "E"}` : ""}>`;
  const functionDeclArgs = catchAllArgs.join(",\n  ");
  const functionDeclReturnType = isDataFirst
    ? catchAllReturnType
    : `${hasFallback && inputIsAdt ? `<E1>` : ""}(${primaryArgDecl}) => ${catchAllReturnType}`;

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
      ? `import { ${isFilter ? "" : "ok,"} err, type Result,type BaseResult  } from "#result/primitive.js";`
      : `${isFilter ? "" : 'import { some } from "#option/primitive.js";'}
      import type { Option, BaseOption } from "#option/primitive.js";
      import { _NONE } from "#option/construct.internal.js";`,
    `import type { GuardFn, PredicateFn } from "#utility/guard/index.js";`,
  ].join("\n");

  return `${[
    `////////////////////////////////////////////////////////////
// ======    AUTO-GENERATED FILE. DO NOT EDIT.    ====== //
//////////////////////////////////////////////////////////`,
    "// biome-ignore-all assist/source/organizeImports: haltsmaul",
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
