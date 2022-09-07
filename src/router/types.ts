import { Component } from 'vue'
import { RouteMeta } from 'vue-router'

export interface RouteData extends RouteMeta {
  path?: string
  redirect?: string
  component?: string | Component
  name: string
  meta: RouteMetaData
}

export interface RouteMetaData extends RouteMeta {
  openType?: string
  title?: string
  keepAlive?: number
  show?: number
  type: number
  icon?: string | Component
  isChain?: number
  permissions?: string[] | null
}
