import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, externalizeDepsPlugin, loadEnv } from "electron-vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    main: {
      plugins: [externalizeDepsPlugin()],
    },
    preload: {
      plugins: [externalizeDepsPlugin()],
    },
    renderer: {
      plugins: [react()],
      server: {
        port: Number(env.VITE_PORT) || 5173,
      },
      resolve: {
        alias: {
          "@renderer": path.resolve("src/renderer/src"),
        },
      },
    },
  };
});
