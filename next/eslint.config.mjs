import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintConfigPrettier from "eslint-config-prettier";
import jsdoc from "eslint-plugin-jsdoc";
import jest from "eslint-plugin-jest";

export default [
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      jsdoc: jsdoc,
      jest,
    },
    rules: {
      "jsdoc/require-description": "error",
      "jsdoc/check-values": "error",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  eslintConfigPrettier,
];
