export enum RoutePageEnum {
  LOGIN_PATH = '/login',
  HOME_PATH = '/dashboard',
  ERROR_PATH = '/404',
  REDIRECT = '/redirect',
  ErrorPageName = 'ErrorPage'
}

export const BlankLayout = () => import('@/layouts/BlankLayout.vue')
export const ParentLayout = () => import('@/layouts/ParentLayout.vue')
export const ErrorPage = () => import('@/views/error/404.vue')
