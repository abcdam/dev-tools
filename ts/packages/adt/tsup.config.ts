// tsup.config.ts
/// <reference types="node" />

// TODO:  Move to separate package
import { readFile } from "node:fs/promises";
import MagicString from "magic-string";
import { defineConfig, type Options } from "tsup";
import * as List from "#utility/list.ts";
import * as Str from "#utility/string.js";
import * as O from "./src/exports/option/seq";
import * as R from "./src/exports/result/seq";

// IS_PROD does not exist at library build-time
//  -> guardrails are stripped in (prod) build-step of consuming projects
// TODO: extend config to accept per-shortcut build-time defaults
(globalThis as any).IS_PROD = false;
type Plugin = (Options["esbuildPlugins"] & {})[number];
const PLUGIN_NAME = "replace-shortcuts";
const defineEsPlugin = <T extends Plugin>(p: T): T => p;
const LOG_TAG = `[${PLUGIN_NAME}]`;

type ReplaceInfo = { matched: string; startAt: number; endAt: number };
type ShortcutConfig = {
  id: string;
  token: { original: string; new: string; originalMatchPat?: string };
};
type Shortcut<C extends ShortcutConfig = ShortcutConfig> = {
  matcher: O.Oper<string, O.Option<ReplaceInfo[]>>;
  config: C;
};
const defineShortcut = <Config extends ShortcutConfig>(
  config: Config,
): Shortcut<Config> => {
  const REPLACER_RE = new RegExp(
    config.token.originalMatchPat ?? `\\b${config.token.original}\\b`,
    "g",
  );
  return {
    config,
    matcher: O.oper(
      Str.matchAll_(REPLACER_RE),
      O.collect(({ "0": matched, index: startAt }) => ({
        matched,
        startAt,
        endAt: startAt + matched.length,
      })),
    ),
  };
};

const createSrcFilter: (
  searchHaystack: O.Oper<string, boolean>,
) => O.Oper<Shortcut, O.Option<Shortcut>> = searchHaystack =>
  R.oper(
    R.checkElse(
      ({ config }) => searchHaystack(config.token.original),
      errCtxt => errCtxt.config.id,
    ),
    R.tapErr(id => console.debug(`${LOG_TAG} shortcut ${id} not applicable`)),
    R.tap(valid =>
      console.debug(`${LOG_TAG} picked shortcut ${valid.config.id}`),
    ),
    O.takeOk,
  );

type ShortcutSummary = {
  config: ShortcutConfig;
  replaceInfoList: ReplaceInfo[];
};
const toShurtcutSummary: (
  srcContent: string,
) => O.Oper<Shortcut[], ShortcutSummary[]> = srcContent =>
  O.oper(
    List.map_(shortcut =>
      O.seq(
        shortcut.matcher(srcContent),
        O.map(replaceInfoList => ({
          replaceInfoList,
          config: shortcut.config,
        })),
      ),
    ),
    items => O.sift(items),
  );
type SourceContext = {
  content: string;
  id: string;
};
const createSummary: (
  shortcutList: Shortcut[],
  ctxt: SourceContext,
) => O.Option<ShortcutSummary[]> = (list, ctxt) => {
  const filter = createSrcFilter(Str.includedIn(ctxt.content));
  return O.seq(
    list,
    List.map_(filter),
    filtered => O.sift(filtered),
    O.check(l => !!l.length),
    O.tapNone(() =>
      console.debug(`-no applicable shortcut found for ${ctxt.id}`),
    ),
    O.map(toShurtcutSummary(ctxt.content)),
  );
};

const shortcutTransformer = <Configs extends readonly ShortcutConfig[]>(
  ...shortcutConfigs: Configs
): Plugin => {
  const shortcuts = shortcutConfigs.map(defineShortcut);
  type EsBuildResult = null | { contents: string; loader: "ts" };
  const replaceCode: O.Oper<SourceContext, EsBuildResult> = ctxt => {
    const code = new MagicString(ctxt.content);
    return O.seq(
      createSummary(shortcuts, ctxt),
      O.map(outcome =>
        outcome.forEach(({ replaceInfoList, config }) => {
          const newToken = config.token.new;
          console.info(
            `${LOG_TAG} applying shortcut ${config.id} with new token '${newToken}':`,
          );
          replaceInfoList.forEach(({ endAt, matched, startAt }) => {
            console.info(
              `- replacing matched token '${matched}' at l${startAt}`,
            );
            code.overwrite(startAt, endAt, newToken);
          });
        }),
      ),
      O.matchOr(
        () => ({
          contents: code.toString(),
          loader: "ts" as const,
        }),
        null,
      ),
    );
  };

  return defineEsPlugin({
    name: PLUGIN_NAME,
    setup(build) {
      build.onLoad({ filter: /src\/.+\.ts$/ }, ({ path }) =>
        R.seqAsync(
          () => readFile(path, "utf-8"),
          R.fromTryAsync(
            e =>
              `Failed to transform ${path}. cause: ${(e instanceof Error && e.message) || "UNKNOWN"}`,
          ),
          R.map(content => replaceCode({ content, id: path })),
          R.unwrapElse(text => ({ errors: [{ text }] })),
        ),
      );
    },
  });
};

export default defineConfig(_options => ({
  entry: ["src/exports/**/*.ts"],
  format: ["cjs", "esm"],
  dts: false,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: false,
  esbuildPlugins: [
    shortcutTransformer({
      id: "replace-is-prod",
      token: {
        original: "IS_PROD",
        new: '(process.env.NODE_ENV === "production")',
      },
    }),
  ],
}));
