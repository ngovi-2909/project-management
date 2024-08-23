import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
), {
    plugins: {
        react,
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            'AudioWorkletGlobalScope': 'readonly',
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "script",

        parserOptions: {
            files: ["*.ts", "*.tsx"],
            project: ["**/tsconfig.json"],
            createDefaultProgram: true,
        },
    },

    rules: {
        semi: ["error", "always"],
        "react/react-in-jsx-scope": "off",
        "no-unused-vars": "off",

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
        }],

        complexity: ["error", {
            max: 100,
        }],

        "react/prop-types": "off",

        "semi-spacing": ["error", {
            before: false,
            after: true,
        }],

        "semi-style": ["error", "last"],
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": "off",
        "react/display-name": "off",
        "@next/next/no-img-element": "off",
        "react/no-unescaped-entities": "off",
        "import/no-anonymous-default-export": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",

        "lines-around-comment": ["warn", {
            beforeLineComment: true,
            beforeBlockComment: true,
            allowBlockStart: true,
            allowClassStart: true,
            allowObjectStart: true,
            allowArrayStart: true,
        }],

        "newline-before-return": "error",

        "@typescript-eslint/ban-types": ["error", {
            extendDefaults: true,

            types: {
                "{}": false,
            },
        }],

        "no-irregular-whitespace": "off",
        "no-undef": "off",

        "@typescript-eslint/naming-convention": ["error", {
            selector: "variable",
            types: ["boolean"],
            format: ["camelCase", "PascalCase"],
            prefix: ["is", "are", "can", "could", "should", "has", "have", "did", "will", "b"],
        }, {
            selector: "variable",
            types: ["array"],
            format: ["camelCase", "PascalCase"],
            suffix: ["s", "list", "List", "array", "ary"],
        }],
    },
}];