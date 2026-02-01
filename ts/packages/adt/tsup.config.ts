import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: [
    "src/modules/*/index.ts",
    "src/modules/result/*/index.ts",
    "src/modules/option/*/index.ts",
    "src/modules/branch/*/index.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: !options.watch,
}));
