import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPluginPrettierRecommended,
  {
    rules: {
      indent: [
        "error",
        2,
        {
          SwitchCase: 1,
        },
      ],
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
      "@typescript-eslint/ consistent-type-definitions": "off",
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
);
