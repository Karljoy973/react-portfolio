import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import type { Linter } from "eslint";

export default defineConfig([
  // Ignorer certains dossiers
  {
    ignores: [
      "__test__/**",
      ".github/**",
      "node_modules/**",
      "public/**",
      ".react-router/**",
      "build/**"
    ],
  },
  tseslint.configs.recommended as Linter.Config[],
  eslintConfigPrettier,
  pluginReact.configs.flat.recommended,
  // Config de base pour JS/TS/React
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: 2023, // support complet ES2023
      sourceType: "module",
      globals: {
        ...globals.browser, // utile si tu fais du front
        ...globals.node,    // ajoute les globals Node 24 (process, Buffer…)
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
      "import/no-default-export": "off"
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  
]);
