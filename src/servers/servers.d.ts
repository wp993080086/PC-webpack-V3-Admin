// Axios返回类型
export type THttpResponse<T = TObject> = {
  code: number
  message: string
  data?: T
}
