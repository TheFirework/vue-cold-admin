import { router } from '.'
import { Cancel } from './../http/cancel'

// const whiteList = ['/login']

router.beforeEach((to: any, _, next) => {
  new Cancel().clearPending()
  next()
})
