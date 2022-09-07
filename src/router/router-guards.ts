import { Cancel } from '@/http/cancel'
import { useRouterStoreWidthOut, useUserStoreWidthOut } from '@/store'
import { Router, RouteRecordRaw } from 'vue-router'
import { errorRoute } from './base.route'
import { RoutePageEnum } from './constant'

const whiteList = [RoutePageEnum.LOGIN_PATH]

export function createRouterGuards(router: Router) {
  const routerStore = useRouterStoreWidthOut()
  const userStore = useUserStoreWidthOut()

  router.beforeEach(async (to: any, from, next) => {
    new Cancel().clearPending()

    const Loading = window.$loading
    Loading && Loading.start()

    if (from.path === RoutePageEnum.LOGIN_PATH && to.name === 'errorPage') {
      next(RoutePageEnum.HOME_PATH)
      return
    }

    // 白名单不做验证
    if (whiteList.includes(to.path)) {
      next()
      return
    }

    // 未登录
    if (!userStore.isLogin) {
      next({
        path: RoutePageEnum.LOGIN_PATH,
        replace: true
      })
      return
    }

    if (routerStore.isDynamicAddRoute) {
      next()
      return
    }

    const routes = await routerStore.generateRoutes()

    routes.forEach((e) => {
      router.addRoute(e as RouteRecordRaw)
    })

    const isErrorPage = router.getRoutes().findIndex((e) => e.name === errorRoute.name)
    if (isErrorPage === -1) {
      router.addRoute(errorRoute)
    }

    routerStore.setDynamicAddRoute(true)

    next({ ...to })
    Loading && Loading.finish()
  })

  router.afterEach((to) => {
    document.title = (to?.meta?.title as string) || document.title
    const Loading = window.$loading
    Loading && Loading.finish()
  })

  router.onError((error) => {
    console.log(error, '路有错误')
  })
}
