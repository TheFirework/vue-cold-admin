interface Window {
  $message: MessageApiInjection
  $loading: LoadingBarInst
  $dialog: DialogApiInjection
  $notification: NotificationApiInjection
}

declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_PUBLIC_PATH: string
  VITE_APP_TITLE: string
  VITE_APP_API_BASE_URL: string
  VITE_APP_USE_MOCK: boolean
}

interface MenuRecordRaw {
  id: number
  parentId: number
  orderNum: number
  status: number
  path?: string
  redirect?: string
  openType?: string
  component?: string
  name: string
  title?: string
  keepAlive?: number
  show?: number
  type: number
  icon?: string
  isChain?: number
  code?: string
}

interface RouteData extends RouteMeta {
  path?: string
  redirect?: string
  component?: string | Component
  name: string
  meta: RouteMetaData
  children?: RouteData[] | null
}

interface RouteMetaData extends RouteMeta {
  openType?: string
  title?: string
  keepAlive?: number
  show?: number
  type: number
  icon?: string | Component | null
  isChain?: number
  permissions?: string[] | null
}
