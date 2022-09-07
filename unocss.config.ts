import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  exclude: ['node_modules', '.git', '.github', '.husky', '.vscode', 'build', 'dist', 'mock', 'public', './stats.html'],
  presets: [presetUno(), presetAttributify()],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['flex-row-c', 'flex flex-row items-center'],
    ['flex-col', 'flex flex-col'],
    ['absolute-lt', 'absolute left-0 top-0'],
    ['absolute-lb', 'absolute left-0 bottom-0'],
    ['absolute-rt', 'absolute right-0 top-0'],
    ['absolute-rb', 'absolute right-0 bottom-0'],
    ['absolute-center', 'absolute-lt f-c-c wh-full'],
    ['text-ellipsis', 'truncate']
  ],
  rules: [],
  theme: {}
})
