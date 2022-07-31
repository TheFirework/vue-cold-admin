import { defineConfig,loadEnv } from "vite";
import path from "path";
import createVitePlugins from './build/plugin'

export default defineConfig(({ command,mode }) => {
  const isBuild = command === "build"
  const viteEnv = loadEnv(mode, process.cwd())
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: createVitePlugins(viteEnv,isBuild),
    server:{
      port:3000,
    },
    build: {
      target: "es2015",
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  };
});


