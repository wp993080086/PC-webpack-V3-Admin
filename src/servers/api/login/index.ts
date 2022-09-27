import { createAxiosExamples } from '@/servers/request'

const R = createAxiosExamples()

export default {
  /**
   * 登录
   * @param {String} key 要取消的接口名
   */
  login(data: TObject) {
    console.log(data)
    return R.post('/api/v1/system/login', { ...data })
  },
  getInfo() {
    return R.post('/api/user/account', {})
  }
}
