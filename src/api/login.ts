import http from '@/http'

export async function login(data: any) {
  return await http.request(
    {
      url: '/login',
      method: 'post',
      data
    },
    {
      isTransformResponse: false
    }
  )
}

export async function logout() {
  return await http.request({
    url: '/logout',
    method: 'post'
  })
}
