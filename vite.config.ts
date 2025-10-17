import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: ".env.development" });

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/shared/utils"),
      "@hooks": path.resolve(__dirname, "./src/shared/hooks"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@theme": path.resolve(__dirname, "./src/theme"),
      "@constants": path.resolve(__dirname, "./src/constants"),
    },
  },
});
