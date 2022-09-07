import { getMenuList } from '@/api/menu'
import { RouteData } from '@/router/types'
import { deepTree } from '@/utils'
import { generatorDynamicRouter } from '@/utils/route'
import { defineStore, storeToRefs } from 'pinia'

export const useRouterStore = defineStore('router', {
  state: () => ({
    isDynamicAddRoute: false,
    menus: <any>[],
    routes: <any>[]
  }),
  getters: {},
  actions: {
    getRoutes() {
      return this.routes
    },
    setMenus(list: any[]) {
      this.menus = list
    },
    setRoutes(list: any[]) {
      this.routes = list
    },
    setDynamicAddRoute(bool: boolean) {
      this.isDynamicAddRoute = bool
    },
    async generateRoutes(): Promise<RouteData[]> {
      return new Promise((resolve, reject) => {
        getMenuList()
          .then((result) => {
            const routes = generatorDynamicRouter(deepTree(result.data))
            this.setRoutes(routes)
            this.setMenus(routes)
            resolve(routes)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})

export function useRouterStoreWidthOut() {
  return useRouterStore()
}

export function useRouterStoreWithState() {
  return storeToRefs(useRouterStore())
}
