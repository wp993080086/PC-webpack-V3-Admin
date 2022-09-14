// axios返回类型
export type THttpResponse<T = TAnyType> = {
  code: number
  message: string
  data?: T
}
