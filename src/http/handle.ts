/*
 * @Date: 2022-08-11 18:33:53
 * @LastEditTime: 2022-08-13 11:58:52
 * @Description:
 */
import { ResultEnum } from '@/enums/httpEnum'
import { router } from '../router'
import { storage } from '../utils'

/**
 * 处理后端错误返回
 * @param code
 * @param errorMsg
 */
export function responseErrorHandle(code: number, errorMsg: string): void {
  const $dialog = window.$dialog
  const $message = window.$message
  switch (code) {
    case ResultEnum.ERROR:
      $message.error(errorMsg)
      break
    case ResultEnum.TOKEN_INVALID:
      errorMsg = '登录超时，请重新登录!'
      $dialog.warning({
        title: '提示',
        content: '登录身份已失效，请重新登录!',
        positiveText: '确定',
        // negativeText: '取消',
        closable: false,
        maskClosable: false,
        onPositiveClick: () => {
          storage.clear()
          router.replace('/login')
        }
      })
      break
  }
  throw new Error(errorMsg)
}

/**
 * 处理http错误返回
 * @param status
 * @param msg
 */
export function httpErrorStatusHandle(status: number, msg: string): void {
  const $message = window.$message
  switch (status) {
    case 400:
      $message.error(msg)
      break
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      $message.error('用户没有权限（令牌、用户名、密码错误）!')
      break
    case 403:
      $message.error('用户得到授权，但是访问是被禁止的。!')
      break
    // 404请求不存在
    case 404:
      $message.error('网络请求错误，未找到该资源!')
      break
    case 405:
      $message.error('网络请求错误，请求方法未允许!')
      break
    case 408:
      $message.error('网络请求超时')
      break
    case 500:
      $message.error('服务器错误,请联系管理员!')
      break
    case 501:
      $message.error('网络未实现')
      break
    case 502:
      $message.error('网络错误')
      break
    case 503:
      $message.error('服务不可用，服务器暂时过载或维护!')
      break
    case 504:
      $message.error('网络超时')
      break
    case 505:
      $message.error('http版本不支持该请求!')
      break
    default:
      $message.error(msg)
  }
}
