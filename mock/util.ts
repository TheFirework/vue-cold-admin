export function resultOk<T>(data: T, message = 'ok') {
  return {
    code: 200,
    data,
    message
  }
}

export function resultFail<T>(message = 'fail', code = -1, data?: T) {
  return {
    code,
    data,
    message
  }
}

export function resultPage<T>(page: number, pageSize: number, list: T[]) {
  const data = pagination(page, pageSize, list)
  return {
    ...resultOk({
      items: data,
      total: list.length
    })
  }
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize))
}

export interface requestParams {
  method: string
  body: any
  headers?: { Authorization?: string }
  query: any
}

export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.Authorization
}
