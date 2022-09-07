import config from '@/config'
import { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { constantRoutes } from './base.route'
import { createRouterGuards } from './router-guards'

const router = createRouter({
  history: config.mode === 'hash' ? createWebHashHistory() : createWebHistory(),
  routes: constantRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router
