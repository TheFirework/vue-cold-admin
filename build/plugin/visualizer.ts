import visualizer from 'rollup-plugin-visualizer'

export const visualizerPlugin = () => {
  return visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true
  })
}
