import AutoImport from "unplugin-auto-import/vite";

export const AutoImportPlugin = () => {
  return AutoImport({
    imports: ["vue", "vue-router"],
    dts: "types/auto-imports.d.ts",
  });
};
