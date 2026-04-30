// tsup.config.ts

/// <reference types="node" />

// TODO:  Move to separate package
import { readFile } from "node:fs/promises";
import MagicString from "magic-string";
import { defineConfig, type Options } from "tsup";
import { isListEmpty, isNotListEmpty } from "#utility/guard/index.js";
import * as O from "./src/exports/option/seq.js";
import * as R from "./src/exports/result/seq.js";
import * as List from "./src/exports/utility/list.js";
import * as Str from "./src/exports/utility/string.js";

// IS_PROD does not exist at library build-time
//  -> guardrails are stripped in (prod) build-step of consuming projects
// TODO: extend config to accept per-shortcut build-time defaults
(globalThis as any).IS_PROD = false;
type Plugin = (Options["esbuildPlugins"] & {})[number];
const PLUGIN_NAME = "replace-shortcuts";
const defineEsPlugin = <T extends Plugin>(p: T): T => p;
const LOG_TAG = `[${PLUGIN_NAME}]`;

type MatchEntry = { matched: string; startAt: number; endAt: number };

type Shortcut = {
  id: string;
  alias: { symbol: string; value: string; searchPattern?: string | RegExp };
};
type Config = { shortcuts: readonly Shortcut[]; include?: RegExp };
interface ResolvedShortcut extends Shortcut {
  matcher: ShortcutMatcher;
}

type ShortcutMatcher = O.OperOption_O<string, MatchEntry[]>;

interface MatchedShortcut extends ResolvedShortcut {
  matchEntries: MatchEntry[];
}
type RawSource = {
  content: string;
  path: string;
};

const toShurtcutSummary: (
  raw: RawSource,
) => O.Oper<ResolvedShortcut[], MatchedShortcut[]> = raw =>
  O.oper(
    List.map_(shortcut =>
      O.seq(
        shortcut.matcher(raw.content),
        O.map(matchEntries => ({ ...shortcut, matchEntries })),
      ),
    ),
    items => O.sift(items),
  );

const checkShortcut: (
  searchHaystack: O.OperPredicate<string>,
) => O.OperOption_O<ResolvedShortcut, ResolvedShortcut> = searchHaystack =>
  R.oper(
    R.checkElse(
      shortcut => searchHaystack(shortcut.alias.symbol),
      shortcut => shortcut.id,
    ),
    R.tapErr(id => console.info(`${LOG_TAG} shortcut ${id} not applicable`)),
    O.takeOk,
    O.tap(shortcut =>
      console.debug(`${LOG_TAG} picked shortcut ${shortcut.id}`),
    ),
  );
const filterShortcuts: (
  shortcutList: ResolvedShortcut[],
  filter: O.OperPredicate<string>,
) => O.Option<ResolvedShortcut[]> = (list, filter) => {
  const f = checkShortcut(filter);
  return O.seq(
    List.map_(f)(list),
    optionList => O.sift(optionList),
    O.check(l => isNotListEmpty(l)),
  );
};
type Transformer = O.Oper<RawSource, EsBuildResult>;
const initTransformer: O.Oper<ResolvedShortcut[], Transformer> = shortcuts => {
  return raw => {
    return O.seq(
      filterShortcuts(shortcuts, Str.includedIn(raw.content)),
      O.tapNone(() =>
        console.debug(`-no applicable shortcut found for ${raw.path}`),
      ),
      O.map(toShurtcutSummary(raw)),
      O.map(matchResults => {
        const code = new MagicString(raw.content);
        matchResults.forEach(({ matchEntries, id, alias }) => {
          console.info(
            `${LOG_TAG} applying shortcut ${id} with value '${alias.value}':`,
          );
          matchEntries.forEach(({ endAt, matched, startAt }) => {
            console.info(
              `- replacing matched token '${matched}' at l${startAt}`,
            );
            code.overwrite(startAt, endAt, alias.value);
          });
        });
        return {
          contents: code.toString(),
          loader: "ts" as const,
        };
      }),
      O.unwrapOr(null),
    );
  };
};

type EsBuildResult = null | { contents: string; loader: "ts" };

const createMatcher: O.Oper<Shortcut, ShortcutMatcher> = config =>
  O.oper(
    Str.matchAll_(
      new RegExp(
        config.alias.searchPattern ?? `\\b${config.alias.symbol}\\b`,
        "g",
      ),
    ),
    O.collect(({ "0": matched, index: startAt }) => ({
      matched,
      startAt,
      endAt: startAt + matched.length,
    })),
  );

const shortcutTransformer: O.Oper<Config, Plugin> = ({
  shortcuts = [],
  include = /src\/.+\.ts$/,
}) => {
  return defineEsPlugin({
    name: PLUGIN_NAME,
    setup(build) {
      if (isListEmpty(shortcuts ?? [])) return;
      const transform = O.seq(
        shortcuts,
        List.map_(shortcut => ({
          ...shortcut,
          matcher: createMatcher(shortcut),
        })),
        initTransformer,
      );
      build.onLoad({ filter: include }, ({ path }) =>
        R.seqAsync(
          async () => ({ content: await readFile(path, "utf-8"), path }),
          R.fromTryAsync(e => `Failed to transform ${path}: ${e.message}}`),
          R.map(transform),
          R.unwrapElse(text => ({ errors: [{ text }] })),
        ),
      );
    },
  });
};
type TsupConfig = ReturnType<typeof defineConfig>;
const buildConfig: TsupConfig = defineConfig(_options => ({
  entry: ["src/exports/**/*.ts"],
  format: ["cjs", "esm"],
  dts: false,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: false,
  esbuildPlugins: [
    shortcutTransformer({
      shortcuts: [
        {
          id: "replace-is-prod",
          alias: {
            symbol: "IS_PROD",
            value: '(process.env.NODE_ENV === "production")',
          },
        },
      ],
    }),
  ],
}));
export default buildConfig;
