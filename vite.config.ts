import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

const useVisualizer = process.env.ANALYZE === "true";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "./dist",
    rollupOptions: {
      plugins: useVisualizer ? [visualizer()] : [],
    },
  },
  base: "/yeti/",
});
