import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { Plugin } from 'vite'

import DefineOptions from 'unplugin-vue-define-options/vite'
import { AutoImportPlugin } from './autoImport'
import { componentPlugin } from './component'
import { compressPlugin } from './compress'
import { htmlPlugin } from './html'
import { unocssPlugin } from './unocss'
import { visualizerPlugin } from './visualizer'
import { viteMockServePlugin } from './viteMockServe'

export default function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_APP_USE_MOCK, VITE_APP_TITLE } = viteEnv
  const plugins: Plugin | Plugin[] = [
    vue(),
    vueJsx(),
    unocssPlugin(),
    DefineOptions(),
    AutoImportPlugin(),
    componentPlugin(),
    compressPlugin()
  ]

  VITE_APP_USE_MOCK && plugins.push(viteMockServePlugin(VITE_APP_USE_MOCK))

  isBuild && plugins.push(visualizerPlugin())

  plugins.push(htmlPlugin(VITE_APP_USE_MOCK, VITE_APP_TITLE))

  return plugins
}
