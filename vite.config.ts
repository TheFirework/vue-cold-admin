import { defineConfig, loadEnv } from "vite";
import path from "path";
import createVitePlugins from "./build/plugin";

export default defineConfig(({ command, mode }) => {
  const isBuild = command === "build";
  const viteEnv = loadEnv(mode, process.cwd());

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/style/variable.scss";',
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    server: {
      host: "0.0.0.0",
      port: 3000,
      open: true,
      https: false,
    },
    build: {
      target: "es2015",
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  };
});
