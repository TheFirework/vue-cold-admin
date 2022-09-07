import { RouteRecordRaw } from 'vue-router'
import { BlankLayout, ErrorPage } from './constant'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: { title: '登录' }
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: {
      title: 'Root'
    }
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: BlankLayout,
    meta: {
      title: 'Redirect'
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          title: 'Redirect'
        }
      }
    ]
  }
]

export const errorRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: BlankLayout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPage',
      component: ErrorPage,
      meta: {
        title: '页面找不到~'
      }
    }
  ]
}
