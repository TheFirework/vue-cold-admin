import { createHtmlPlugin } from 'vite-plugin-html'

export const htmlPlugin = (enabled: boolean, title: string) => {
  return createHtmlPlugin({
    minify: enabled,
    inject: {
      data: {
        title: title
      }
    }
  })
}
