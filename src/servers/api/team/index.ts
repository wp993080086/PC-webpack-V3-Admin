import { createAxiosExamples } from '@/servers/request'

const R = createAxiosExamples()

/**
 * 请求枚举
 * @key 接口方法名
 * @controller 接口控制器
 */
const requsetList = [
  { key: 'getFilter', controller: new AbortController() },
  { key: 'sendFilter', controller: new AbortController() }
]

export default {
  /**
   * 取消请求
   * @param {String} key 要取消的接口名
   */
  cancel(key: string) {
    const target = requsetList.find(item => item.key === key)
    target?.controller.abort()
  },
  getFilter(data: string) {
    console.log(data)
    return R.post(
      '/api/v1/business/get_filter',
      {},
      {
        signal: requsetList[0].controller.signal
      }
    )
  },
  sendFilter(data: string) {
    console.log(data)
    return R.post(
      '/api/v1/business/send_filter',
      {},
      {
        signal: requsetList[1].controller.signal
      }
    )
  }
}
