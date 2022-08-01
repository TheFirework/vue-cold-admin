import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
export const componentPlugin = () => {
  return Components({
    dts: "types/components.d.ts",
    resolvers: [NaiveUiResolver()],
  });
};
