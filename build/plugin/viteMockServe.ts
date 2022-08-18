import { viteMockServe } from 'vite-plugin-mock'

export const viteMockServePlugin = (enabled: boolean) => {
  return viteMockServe({
    mockPath: 'mock',
    localEnabled: enabled,
    prodEnabled: enabled,
    supportTs: true,
    watchFiles: true,
    logger: false,
    injectCode: `
              import { setupProdMockServer } from './mock/mockProdServer';
              setupProdMockServer();
            `
  })
}
