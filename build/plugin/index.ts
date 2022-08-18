import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import DefineOptions from 'unplugin-vue-define-options/vite'
import { AutoImportPlugin } from './autoImport'
import { componentPlugin } from './component'
import { visualizerPlugin } from './visualizer'
import { viteMockServePlugin } from './viteMockServe'
import { compressPlugin } from './compress'
import { unocssPlugin } from './unocss'

export default function createVitePlugins(viteEnv: Record<string, string>, isBuild: boolean) {
  const plugins: Plugin | Plugin[] = [
    vue(),
    vueJsx(),
    unocssPlugin(),
    DefineOptions(),
    AutoImportPlugin(),
    componentPlugin(),
    compressPlugin()
  ]

  viteEnv.VITE_APP_USE_MOCK && plugins.push(viteMockServePlugin(viteEnv.VITE_APP_USE_MOCK === '1'))

  isBuild && plugins.push(visualizerPlugin())

  return plugins
}
