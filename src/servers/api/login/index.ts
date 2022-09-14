import { createAxiosExamples } from '@/servers/request'

const R = createAxiosExamples()

/**
 * 请求枚举
 * @key 接口方法名
 * @controller 接口控制器
 */
const requsetList = [
  { key: 'login', controller: new AbortController() },
  { key: 'getInfo', controller: new AbortController() }
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
  /**
   * 登录
   * @param {String} key 要取消的接口名
   */
  login(data: TAnyType) {
    console.log(data)
    return R.post(
      '/api/login/cellphone',
      { ...data },
      {
        signal: requsetList[0].controller.signal
      }
    )
  },
  getInfo() {
    return R.post(
      '/api/user/account',
      {},
      {
        signal: requsetList[1].controller.signal
      }
    )
  }
}
