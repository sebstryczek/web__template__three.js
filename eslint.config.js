import esLint from "@eslint/js";
import esLintPrettier from "eslint-plugin-prettier/recommended";
import esLintSimpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tsEsLint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  // https://eslint.org/docs/latest/use/configure/language-options#predefined-global-variables
  { languageOptions: { globals: globals.browser } },
  // https://typescript-eslint.io/getting-started
  esLint.configs.recommended,
  ...tsEsLint.configs.recommended,
  ...tsEsLint.configs.strictTypeChecked,
  ...tsEsLint.configs.stylisticTypeChecked,
  esLintPrettier,
  {
    plugins: {
      // https://github.com/lydell/eslint-plugin-simple-import-sort
      "simple-import-sort": esLintSimpleImportSort,
    },
    rules: {
      indent: [
        "error",
        2,
        {
          SwitchCase: 1,
          // https://stackoverflow.com/questions/52178093/ignore-the-indentation-in-a-template-literal-with-the-eslint-indent-rule
          ignoredNodes: ["TemplateLiteral *"],
        },
      ],
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/restrict-template-expressions": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js"],
          defaultProject: "./tsconfig.json",
        },
      },
    },
  },
];
