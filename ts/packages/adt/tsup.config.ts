import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts", "src/result/**/*.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: !options.watch,
}));
