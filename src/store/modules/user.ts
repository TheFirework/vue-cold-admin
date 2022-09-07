import { login } from '@/api/login'
import config from '@/config'
import { ResultEnum } from '@/enums/httpEnum'
import { storage } from '@/utils'
import { defineStore, storeToRefs } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: storage.get(config.ACCESS_TOKEN, ''),
    userInfo: storage.get(config.USERINFO, {})
  }),
  getters: {
    isLogin: (state) => !!state.token
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    getToken() {
      return this.token
    },
    setUserInfo(info: any) {
      this.userInfo = info
    },
    async login(userInfo: any) {
      try {
        const response = await login(userInfo)
        if (response.code === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000
          storage.set(config.ACCESS_TOKEN, response.data.token, ex)
          storage.set(config.USERINFO, response.data, ex)
          this.setToken(response.data.token)
          this.setUserInfo(response.data)
        }
        return await Promise.resolve(response)
      } catch (e) {
        return await Promise.reject(e)
      }
    }
  }
})

export function useUserStoreWidthOut() {
  return useUserStore()
}

export function useUserStoreWithState() {
  return storeToRefs(useUserStore())
}
