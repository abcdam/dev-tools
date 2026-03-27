// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig((_options) => ({
  entry: ["src/exports/**/*.ts"],
  format: ["cjs", "esm"],
  dts: false,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: false,
}));
