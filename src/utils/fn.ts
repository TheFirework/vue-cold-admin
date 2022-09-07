export const deepTree = (list: any[]) => {
  const newList: any = []
  const map: { [key: string]: any } = {}
  list.forEach((e) => (map[e.id] = e))
  list.forEach((e) => {
    const parent = map[e.parentId]
    if (parent) {
      ;(parent.children || (parent.children = [])).push(e)
    } else {
      if (!e.parentId) {
        newList.push(e)
      }
    }
  })
  const fn = (list: any[]) => {
    list.map((e: { children: any }) => {
      if (e.children instanceof Array) {
        e.children = orderBy(e.children, 'id')
        fn(e.children)
      }
    })
  }
  fn(newList)
  return orderBy(newList, 'orderNum')
}

export function orderBy(list: any[], key: string) {
  return list.sort((a: { [x: string]: number }, b: { [x: string]: number }) => a[key] - b[key])
}
