import path from "node:path";
import react from "@vitejs/plugin-react";
import biomePlugin from "vite-plugin-biome";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), biomePlugin()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
	},
});
