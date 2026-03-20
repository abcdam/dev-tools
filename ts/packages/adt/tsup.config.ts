// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig((_options) => ({
  entry: [
    "src/modules/*/index.ts",
    "src/modules/result/*/index.ts",
    "src/modules/option/*/index.ts",
    "src/modules/branch/*/index.ts",
    "src/modules/compose/index.ts",
  ],
  format: ["cjs", "esm"],
  dts: false,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: false,
}));
