import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
export const componentPlugin = () => {
    return Components({
        resolvers: [NaiveUiResolver()],
      })
}