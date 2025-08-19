/// <reference types="vitest/config" />
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path"
import { configDefaults} from "vitest/config"

export default defineConfig({
  plugins: [tailwindcss(), !process.env.VITEST &&  reactRouter(), tsconfigPaths()],
   resolve: {
      alias: {
      "@": resolve(__dirname, "./app"),
    },
  },
  test: {
    ...configDefaults,
    environment: "happy-dom"
    
  },
  
});
