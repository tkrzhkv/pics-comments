import { fixupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	...pluginQuery.configs["flat/recommended"],
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{
		plugins: {
			"react-hooks": fixupPluginRules(reactHooks),
			"react-refresh": reactRefresh,
			"@tanstack/query": pluginQuery,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react/react-in-jsx-scope": "off",
			"@tanstack/query/exhaustive-deps": "error",
			"react-hooks/exhaustive-deps": "off",
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
		},
	},
	{
		languageOptions: {
			globals: globals.browser,
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
