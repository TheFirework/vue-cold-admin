import { viteMockServe } from "vite-plugin-mock";

export const viteMockServePlugin = (enabled: boolean) => {
  return viteMockServe({
    mockPath: "mock",
    localEnabled: !enabled,
    prodEnabled: enabled,
    supportTs: false,
    watchFiles: true,
    injectCode: `
              import { setupProdMockServer } from '../mock/mockProdServer';
              setupProdMockServer();
            `,
  });
};
