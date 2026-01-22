import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: [
    "src/index.ts",
    "src/result/**/*.ts",
    "src/memoize/**/*.ts",
    "src/option/**/*.ts",
    "src/match/**/*.ts",
    "src/attempt/**/*.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: !options.watch,
}));
