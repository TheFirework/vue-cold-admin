import axios, { AxiosRequestConfig, Canceler } from 'axios'
import qs from 'qs'
import { isFunction } from '../utils'
let pendingMap = new Map<string, Canceler>()
// 生成每个请求唯一的键
export function getPendingKey(config: AxiosRequestConfig) {
  const { url, method, params, data } = config
  return [url, method, qs.stringify(data), qs.stringify(params)].join('&')
}
export class Cancel {
  /**
   * 添加请求
   * @param config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const pendingKey = getPendingKey(config)
    config.cancelToken =
      config.cancelToken != null ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(pendingKey)) {
          pendingMap.set(pendingKey, cancel)
        }
      })
  }

  /**
   * 删除重复的请求
   * @param config
   */
  removePending(config: AxiosRequestConfig) {
    const pendingKey = getPendingKey(config)
    if (pendingMap.has(pendingKey)) {
      const cancelToken = pendingMap.get(pendingKey)
      cancelToken != null && cancelToken(pendingKey)
      pendingMap.delete(pendingKey)
    }
  }

  clearPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  /**
   * 重置
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
