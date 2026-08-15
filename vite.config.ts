import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    rollupOptions: {
      // React sai num chunk próprio: deploy que mexe só em texto não invalida o cache dele.
      output: {
        manualChunks: {
          react: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
        },
      },
    },
  },
});
