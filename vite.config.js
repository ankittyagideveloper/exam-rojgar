import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import { manifestForPlugIn } from "./manifest";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA(manifestForPlugIn)],
  base: "/exam-rojgar/",
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  server: {
    proxy: {
      // "/api": {
      //   target: "https://examrojgar-v1.onrender.com",
      //   changeOrigin: true,
      //   secure: true,
      //   // rewrite: (path) => path.replace(/^\/api/, ''),
      // },
    },
  },
});
