import Unocss from "unocss/vite";
import transformerDirective from "@unocss/transformer-directives";

export const unocssPlugin = () => {
  return Unocss({
    transformers: [transformerDirective()],
    rules:[],
  });
};
