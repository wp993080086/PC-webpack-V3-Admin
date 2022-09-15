// Axios返回类型
export type THttpResponse<T = TAnyObject> = {
  code: number
  message: string
  data?: T
}
