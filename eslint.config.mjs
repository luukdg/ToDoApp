// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "webpack.config.js"], // ⬅️ add this
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      prettier: pluginPrettier,
      js,
    },
    extends: ["js/recommended", prettier],
    rules: {
      "prettier/prettier": "error",
    },
  },
]);
