import App from '@/App.vue'
import { NaiveProvider } from '@/components/common'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'
import '@/style/index.scss'
import 'uno.css'
import { createApp } from 'vue'

const setupApp = async () => {
  const provider = createApp(NaiveProvider)
  const app = createApp(App)
  setupStore(app)
  provider.mount('#provider')
  await setupRouter(app)
  await router.isReady()
  app.mount('#app')
}

setupApp()
