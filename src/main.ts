import App from '@/App.vue'
import { router } from '@/router'
import { pinia } from '@/store'
import { createApp } from 'vue'

import '@/style/index.scss'
import 'uno.css'

const setupApp = () => {
  const app = createApp(App)

  app.use(pinia)

  app.use(router)

  app.mount('#app')
}

setupApp()
