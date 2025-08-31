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
      "__tests__/**",
      ".github/**",
      "node_modules/**",
      "public/**",
      ".react-router/**",
      "build/**",
    ],
  },

  // Base TypeScript + React + Prettier
  tseslint.configs.recommended as Linter.Config[],
  eslintConfigPrettier,
  pluginReact.configs.flat.recommended,

  // Config générale JS/TS/React
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // JSX moderne → plus besoin d'importer React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/no-unescaped-entities": "off",

      // Tu choisis d’autoriser les default exports
      "import/no-default-export": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Exceptions locales : index.tsx, root.tsx, routes/*
  {
    files: ["app/**/index.tsx", "app/root.tsx", "app/routes/**/*.tsx"],
    rules: {
      // On désactive seulement ce qui pose problème
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
]);
