import ViteCompression from "vite-plugin-compression";

export const compressPlugin = () => {
  return ViteCompression({ ext: ".gz", deleteOriginFile: false });
};
