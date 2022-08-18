import Layout from '@/layouts/index.vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: async () => await import('@/views/login/index.vue'),
    name: 'login',
    meta: { title: '登录' }
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        component: async () => await import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页'
        }
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})
