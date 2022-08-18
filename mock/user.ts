import { mock } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
import { getRequestToken, resultFail, resultOk } from './util'

export default [
  {
    url: '/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (username !== 'admin' || password !== '123456') {
        return resultFail('帐户或密码不正确')
      }
      return resultOk(
        mock({
          id: 1,
          name: 'Admin',
          username,
          email: 'admin@gamil.com',
          token: '@guid'
        })
      )
    }
  },
  {
    url: '/logout',
    timeout: 200,
    method: 'post',
    response: ({ headers }) => {
      const token = getRequestToken(headers)
      if (!token) {
        return resultFail('登录失效', 401)
      }
      return resultOk({}, '退出登录!')
    }
  }
] as MockMethod[]
