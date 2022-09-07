import { BlankLayout, ParentLayout } from '@/router/constant'
import { RouteData, RouteMetaData } from '@/router/types'
import { renderIcon } from '@/utils'

const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()

LayoutMap.set('ParentLayout', ParentLayout)
LayoutMap.set('BlankLayout', BlankLayout)

export const generatorRouter = (routerMap: any[], parent?: any): RouteData[] => {
  routerMap
    .filter((e) => e.type === 3)
    .forEach((e) => {
      if (parent && parent.meta.type === 2 && e.type === 3) {
        parent.meta.permissions?.push(e.code)
      }
    })

  return routerMap
    .filter((e) => e.type !== 3)
    .map((item) => {
      const currentRouter: RouteData = {
        path: `${(parent && parent.path) || ''}/${item.path}`,
        name: item.name || '',
        component: item.component,
        meta: {
          title: item.title,
          keepAlive: item.keepAlive,
          show: item.show,
          type: item.type,
          icon: item.icon ? renderIcon(item.icon) : null,
          isChain: item.isChain,
          openType: item.openType,
          permissions: null
        } as RouteMetaData
      }

      item.redirect && (currentRouter.redirect = item.redirect)
      if (item.children && item.children.length > 0) {
        const children = generatorRouter(item.children, currentRouter)
        if (children && children.length > 0) {
          currentRouter.children = children
        }
      }
      return currentRouter
    })
}

export const generatorDynamicRouter = (routes: any[]): RouteData[] => {
  const routeList: RouteData[] = generatorRouter(routes)
  dynamicImportRoute(routeList)
  return routeList
}

export const dynamicImportRoute = (routes: RouteData[] | undefined) => {
  const viewsModules: Record<string, () => Promise<Recordable>> = import.meta.glob('../views/**/*.{vue,tsx}')
  if (!routes) return
  routes.forEach((item) => {
    const layoutComponent = LayoutMap.get(item.component as string)
    if (layoutComponent) {
      item.component = layoutComponent
    } else {
      item.component = dynamicImport(viewsModules, item.component as string)
    }
    item.children && dynamicImportRoute(item.children as unknown as RouteData[])
  })
}

export const dynamicImport = (viewsModules: Record<string, () => Promise<Recordable>>, component: string) => {
  const keys = Object.keys(viewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../', '')
    return k === component
  })
  if (matchKeys?.length === 1) {
    const matchKey: any = matchKeys[0]
    return viewsModules[matchKey]
  }
  if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    )
    return
  }
}
