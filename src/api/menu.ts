import http from '@/http'

export async function getMenuList() {
  return await http.request(
    {
      url: '/menu/list',
      method: 'get'
    },
    {
      isTransformResponse: false
    }
  )
}
