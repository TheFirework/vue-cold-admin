import { createPinia } from 'pinia'
import { App } from 'vue'

const pinia = createPinia()

export * from './modules'
export { pinia }

export function setupStore(app: App) {
  app.use(pinia)
}
