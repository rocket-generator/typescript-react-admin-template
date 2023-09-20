/// <reference types="vitest" />

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export -- `export default` is required for vite.config.ts
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "happy-dom",
    exclude: ["**/node_modules/**", "**/dist/**", "src/__tests__/utils/**"],
    globalSetup: "./scripts/vitestGlobalSetup.ts",
    globals: true,
  },
})
