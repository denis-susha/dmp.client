import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    globalIgnores([".next/**", "out/**", "build/**", "node_modules/**", "next-env.d.ts"]),
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...nextCoreWebVitals,
    ...nextTypescript,
    prettierRecommended,
    {
        languageOptions: {
            globals: { ...globals.browser },
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],
            "@typescript-eslint/no-empty-object-type": "warn",
            "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
            "@next/next/no-img-element": "warn",
            // React Compiler oriented rules from eslint-plugin-react-hooks 7. The app does not use the compiler,
            // and the flagged patterns (setState in effects, ref reads during render) work correctly without it,
            // so they are reported as warnings instead of blocking the build.
            "react-hooks/set-state-in-effect": "warn",
            "react-hooks/set-state-in-render": "warn",
            "react-hooks/refs": "warn",
            "react-hooks/purity": "warn",
            "react-hooks/static-components": "warn",
            "react-hooks/preserve-manual-memoization": "warn",
        },
    },
    {
        files: ["*.config.js", "pm2.config.js", "next-i18next.config.js"],
        languageOptions: {
            sourceType: "commonjs",
            globals: { ...globals.node },
        },
        rules: {
            "@typescript-eslint/no-require-imports": "off",
        },
    },
]);
