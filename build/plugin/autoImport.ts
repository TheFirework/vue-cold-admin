import AutoImport from "unplugin-auto-import/vite";

export const AutoImportPlugin = () => {
  return AutoImport({
    imports: ["vue", "vue-router"],
    dts: "src/auto-imports.d.ts",
  });
};
