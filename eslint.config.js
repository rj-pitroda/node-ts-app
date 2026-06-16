import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: ["_temp/**", "dist/**"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs,ts}"],

    languageOptions: {
      globals: globals.node,
    },

    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": "off",
    },

    plugins: {
      prettier: prettierPlugin,
    },
  },

  eslintConfigPrettier,
];
